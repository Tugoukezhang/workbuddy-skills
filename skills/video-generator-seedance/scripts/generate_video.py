#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
使用火山引擎 SD1.5pro API 生成视频
支持命令行参数传入提示词和图片地址
从config.json读取API Key和模型ID
"""

import sys
import json
import time
import requests
import argparse
import os

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

class SD15ProVideoGenerator:
    """SD1.5pro 视频生成器"""
    
    def __init__(self, config_path=None):
        """
        初始化视频生成器
        
        Args:
            config_path: 配置文件路径，如果为None则使用默认路径
        """
        # 确定配置文件路径
        if config_path is None:
            # 使用技能目录中的config.json
            script_dir = os.path.dirname(os.path.abspath(__file__))
            config_path = os.path.join(script_dir, '..', 'config.json')
        
        # 加载配置
        self.config = self.load_config(config_path)
        
        # 从配置中获取API Key和模型ID
        self.api_key = self.config.get('api_key')
        self.model = self.config.get('model', 'ep-20260313005600-p8s6m')  # 默认模型
        
        if not self.api_key:
            raise ValueError("配置文件中缺少api_key，请在config.json中配置API Key")
        
        # API配置
        self.create_task_url = "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    def load_config(self, config_path):
        """
        加载配置文件
        
        Args:
            config_path: 配置文件路径
        
        Returns:
            配置字典
        """
        if not os.path.exists(config_path):
            raise FileNotFoundError(
                f"配置文件不存在: {config_path}\n"
                f"请创建config.json文件并配置以下内容：\n"
                f'{{\n'
                f'  "api_key": "你的火山引擎API Key",\n'
                f'  "model": "你的模型ID"\n'
                f'}}'
            )
        
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        return config
    
    def create_video_task(self, prompt, image_url=None, duration=5, camera_fixed=False, watermark=True):
        """
        创建视频任务
        
        Args:
            prompt: 文本提示词
            image_url: 参考图片URL（可选）
            duration: 视频时长（秒）
            camera_fixed: 相机是否固定
            watermark: 是否添加水印
        
        Returns:
            任务ID
        """
        print(f"🎬 开始创建视频任务...")
        print(f"  模型: {self.model}")
        print(f"  提示词: {prompt}")
        if image_url:
            print(f"  参考图片: {image_url}")
        else:
            print(f"  参考图片: 无（纯文本生成）")
        print(f"  时长: {duration}秒")
        print(f"  相机固定: {camera_fixed}")
        print(f"  水印: {watermark}")
        print()
        
        # 构建请求体
        # 参数在text中，格式："{prompt} --duration {duration} --camerafixed {camera_fixed} --watermark {watermark}"
        text_with_params = f"{prompt} --duration {duration} --camerafixed {str(camera_fixed).lower()} --watermark {str(watermark).lower()}"
        
        # 构建content数组
        content = [
            {
                "type": "text",
                "text": text_with_params
            }
        ]
        
        # 如果提供了参考图片，添加到content中
        if image_url:
            content.append({
                "type": "image_url",
                "image_url": {
                    "url": image_url
                }
            })
        
        payload = {
            "model": self.model,
            "content": content
        }
        
        print("📝 请求体:")
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        print()
        
        try:
            response = requests.post(
                self.create_task_url,
                headers=self.headers,
                json=payload,
                timeout=30
            )
            
            print(f"📥 响应状态码: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                print("📝 响应内容:")
                print(json.dumps(result, ensure_ascii=False, indent=2))
                print()
                
                # 提取任务ID
                if "id" in result:
                    task_id = result["id"]
                    print(f"✅ 视频生成任务已创建")
                    print(f"  任务ID: {task_id}")
                    return task_id
                else:
                    print("❌ 响应中未找到任务ID")
                    return None
            else:
                print(f"❌ 创建任务失败")
                print(f"  错误信息: {response.text}")
                return None
                
        except Exception as e:
            print(f"❌ 创建视频任务时出错: {e}")
            return None
    
    def check_task_status(self, task_id):
        """
        查询任务状态
        
        Args:
            task_id: 任务ID
        
        Returns:
            任务状态信息
        """
        print(f"🔍 查询任务状态: {task_id}")
        
        try:
            response = requests.get(
                f"{self.create_task_url}/{task_id}",
                headers=self.headers,
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                return result
            else:
                print(f"❌ 查询任务状态失败: {response.text}")
                return None
                
        except Exception as e:
            print(f"❌ 查询任务状态时出错: {e}")
            return None
    
    def wait_for_completion(self, task_id, max_wait_time=300, poll_interval=10):
        """
        等待任务完成
        
        Args:
            task_id: 任务ID
            max_wait_time: 最大等待时间（秒）
            poll_interval: 轮询间隔（秒）
        
        Returns:
            完成后的任务信息
        """
        print(f"⏳ 等待任务完成...")
        print(f"  最大等待时间: {max_wait_time}秒")
        print(f"  轮询间隔: {poll_interval}秒")
        print()
        
        start_time = time.time()
        
        while True:
            elapsed_time = int(time.time() - start_time)
            
            if elapsed_time >= max_wait_time:
                print(f"⏰ 超时: 已等待{elapsed_time}秒")
                return None
            
            # 查询任务状态
            task_info = self.check_task_status(task_id)
            
            if task_info:
                status = task_info.get("status", "unknown")
                print(f"  [{elapsed_time}s] 状态: {status}")
                
                if status == "succeeded":
                    print("✅ 任务完成！")
                    return task_info
                elif status == "failed":
                    print("❌ 任务失败")
                    error = task_info.get("error", "未知错误")
                    print(f"  错误信息: {error}")
                    return None
                elif status == "processing" or status == "running" or status == "queued":
                    # 继续等待
                    pass
                else:
                    print(f"⚠️  未知状态: {status}")
            
            # 等待下一次轮询
            time.sleep(poll_interval)
    
    def get_video_url(self, task_info):
        """
        从任务信息中提取视频URL
        
        Args:
            task_info: 任务信息
        
        Returns:
            视频URL
        """
        # 根据实际响应格式，视频URL在 content.video_url 中
        if "content" in task_info:
            if "video_url" in task_info["content"]:
                return task_info["content"]["video_url"]
        
        # 尝试其他可能的路径
        if "result" in task_info:
            if "video" in task_info["result"]:
                return task_info["result"]["video"]
            elif "video_url" in task_info["result"]:
                return task_info["result"]["video_url"]
        
        if "video_url" in task_info:
            return task_info["video_url"]
        
        if "video" in task_info:
            return task_info["video"]
        
        return None
    
    def download_video(self, video_url, output_path):
        """
        下载视频
        
        Args:
            video_url: 视频URL
            output_path: 输出路径
        
        Returns:
            是否成功
        """
        print(f"📥 下载视频...")
        print(f"  视频URL: {video_url}")
        print(f"  输出路径: {output_path}")
        
        try:
            response = requests.get(video_url, stream=True, timeout=30)
            
            if response.status_code == 200:
                with open(output_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                
                file_size = len(open(output_path, 'rb').read()) / (1024*1024)
                print(f"✅ 视频下载成功")
                print(f"  文件大小: {file_size:.2f} MB")
                return True
            else:
                print(f"❌ 下载视频失败: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ 下载视频时出错: {e}")
            return False

def main():
    """主函数"""
    # 解析命令行参数
    parser = argparse.ArgumentParser(description='SD1.5pro 视频生成器')
    parser.add_argument('prompt', type=str, help='文本提示词')
    parser.add_argument('--image', type=str, help='参考图片URL（可选）')
    parser.add_argument('--duration', type=int, default=5, help='视频时长（秒），默认5')
    parser.add_argument('--output', type=str, help='输出文件路径，默认保存到桌面')
    parser.add_argument('--camera-fixed', type=bool, default=False, help='相机是否固定，默认False')
    parser.add_argument('--watermark', type=bool, default=True, help='是否添加水印，默认True')
    parser.add_argument('--config', type=str, help='配置文件路径，默认使用技能目录中的config.json')
    
    args = parser.parse_args()
    
    print("🎬 SD1.5pro 视频生成器")
    print("=" * 60)
    
    try:
        # 创建视频生成器（从配置文件加载API Key和模型ID）
        generator = SD15ProVideoGenerator(config_path=args.config)
        
        # 确定输出路径
        if args.output:
            output_path = args.output
        else:
            # 使用提示词的前10个字符作为文件名
            safe_name = args.prompt[:10].replace(' ', '_').replace('/', '_')
            output_path = rf"C:\Users\Administrator\Desktop\{safe_name}.mp4"
        
        # 步骤1: 创建视频任务
        task_id = generator.create_video_task(
            prompt=args.prompt,
            image_url=args.image,
            duration=args.duration,
            camera_fixed=args.camera_fixed,
            watermark=args.watermark
        )
        
        if not task_id:
            print("❌ 无法创建视频生成任务")
            return
        
        print()
        
        # 步骤2: 等待任务完成
        task_info = generator.wait_for_completion(task_id)
        
        if not task_info:
            print("❌ 任务未完成")
            return
        
        print()
        
        # 步骤3: 提取视频URL
        video_url = generator.get_video_url(task_info)
        
        if not video_url:
            print("❌ 未找到视频URL")
            return
        
        print(f"📹 视频URL: {video_url}")
        print()
        
        # 步骤4: 下载视频
        success = generator.download_video(video_url, output_path)
        
        if success:
            print()
            print("=" * 60)
            print("🎉 视频生成完成！")
            print(f"📁 文件位置: {output_path}")
        else:
            print()
            print("=" * 60)
            print("❌ 视频生成失败")
            
    except FileNotFoundError as e:
        print(f"❌ 配置错误: {e}")
        print()
        print("请创建config.json文件并配置以下内容：")
        print('{')
        print('  "api_key": "你的火山引擎API Key",')
        print('  "model": "你的模型ID"')
        print('}')
    except ValueError as e:
        print(f"❌ 配置错误: {e}")
    except Exception as e:
        print(f"❌ 发生错误: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
