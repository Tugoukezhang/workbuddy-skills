"""
自动拼接分镜视频 + 加转场 + 叠 Q版 + 合 BGM
用法: python auto_edit.py --input ./segments/ --output final.mp4

前提: pip install moviepy
"""

import os, sys, argparse
from pathlib import Path

def concat_segments(seg_dir, output, transitions="dissolve", transition_dur=0.3):
    """拼接所有段视频，段间加叠化转场"""
    try:
        from moviepy.editor import VideoFileClip, concatenate_videoclips, CompositeVideoClip
        from moviepy.video.fx.all import crossfadein, crossfadeout
    except ImportError:
        print("❌ 需要安装 moviepy: pip install moviepy")
        return False

    # 读取所有视频文件（按文件名排序）
    video_files = sorted(Path(seg_dir).glob("*.mp4"))
    if not video_files:
        video_files = sorted(Path(seg_dir).glob("*.mov"))
    if not video_files:
        print(f"❌ 在 {seg_dir} 中找不到 .mp4 或 .mov 文件")
        return False

    print(f"📁 找到 {len(video_files)} 个视频片段")
    for vf in video_files:
        print(f"   {vf.name}")

    # 加载所有片段
    clips = []
    for vf in video_files:
        clip = VideoFileClip(str(vf))
        # 每段加 0.3s 叠化进入和离开
        clip = clip.crossfadein(transition_dur).crossfadeout(transition_dur)
        clips.append(clip)
        print(f"   ✅ 加载: {vf.name} ({clip.duration:.1f}s)")

    # 拼接（叠化方式：每段之间叠加 transition_dur 秒）
    final = concatenate_videoclips(
        clips,
        method="compose",
        padding=-transition_dur  # 负值 = 叠化
    )

    print(f"\n🎬 总时长: {final.duration:.1f}s")

    # 如果提供了 BGM，叠加音轨
    bgm_path = Path(seg_dir).parent / "bgm.mp3"
    if bgm_path.exists():
        print("🎵 叠加 BGM...")
        from moviepy.editor import AudioFileClip
        bgm = AudioFileClip(str(bgm_path)).subclip(0, final.duration)
        final = final.set_audio(bgm)

    # 导出
    print(f"💾 导出中... → {output}")
    final.write_videofile(
        output,
        codec="libx264",
        audio_codec="aac",
        fps=30,
        preset="medium",
        threads=4
    )

    for clip in clips:
        clip.close()
    final.close()
    print("✅ 完成！")
    return True


def overlay_q_versions(output, q_dir, final_output):
    """在已拼接的视频上叠加 Q 版图片"""
    try:
        from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip
    except ImportError:
        print("❌ 需要安装 moviepy")
        return False

    video = VideoFileClip(output)
    q_files = sorted(Path(q_dir).glob("*.png"))

    if not q_files:
        print("⚠️ 没有 Q 版图片，跳过叠加")
        video.close()
        return True

    layers = [video]
    for qf in q_files:
        q_img = ImageClip(str(qf)).set_duration(1.2).set_position(("center", "center"))
        # Q 版卡出现在视频 1/3 处
        q_img = q_img.set_start(video.duration * 0.33)
        layers.append(q_img)

    final = CompositeVideoClip(layers)
    final.write_videofile(
        final_output,
        codec="libx264",
        audio_codec="aac",
        fps=30,
        preset="medium"
    )
    video.close()
    print("✅ Q版叠加完成")
    return True


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="自动拼接分镜视频")
    parser.add_argument("--input", "-i", required=True, help="视频片段目录")
    parser.add_argument("--output", "-o", default="final.mp4", help="输出文件名")
    parser.add_argument("--q_dir", "-q", default=None, help="Q版图片目录（可选）")
    parser.add_argument("--transition", "-t", default=0.3, type=float, help="转场叠化时长(秒)")

    args = parser.parse_args()

    # Step 1: 拼接
    temp = "temp_concatenated.mp4"
    if not concat_segments(args.input, temp, transition_dur=args.transition):
        sys.exit(1)

    # Step 2: 叠 Q版
    final_out = args.output
    if args.q_dir and Path(args.q_dir).exists():
        overlay_q_versions(temp, args.q_dir, final_out)
    else:
        # 无 Q版，直接重命名
        os.rename(temp, final_out)

    # 清理
    if os.path.exists(temp):
        os.remove(temp)

    print(f"\n✨ 最终文件: {final_out}")
