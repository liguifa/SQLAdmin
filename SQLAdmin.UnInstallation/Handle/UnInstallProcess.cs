using Common.Logger;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.IO;

namespace MMS.UnInstallation
{
    public class UnInstallProcess
    {
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);
        private const string mRegistryKey = @"Software\Microsoft\Windows\CurrentVersion\UnInstall\MMS";
        private string mInstallPath = String.Empty;
        private ProcessViewModel process = ProcessViewModel.GetInstance();

        public void Start()
        {
            Thread thread = new Thread(UnInstall);
            thread.Start();
        }

        private void UnInstall()
        {
            try
            {
                process.RefreshProgressBar("读取卸载信息.", 0);
                this.GetInstallPath();
                process.RefreshProgressBar("删除安装文件.", 10);
                this.RemoveFiles();
                process.RefreshProgressBar("删除桌面快捷方式.", 80);
                this.RemoveDestopShorcut();
                process.RefreshProgressBar("删除注册表.", 90);
                this.RemoveRegistry();
                process.RefreshProgressBar("卸载完成.", 100);
            }
            catch (Exception e)
            {
                FinishViewModel.GetInstance().Message = e.Message;
                Navigation.GetInstance().Next();
            }
        }

        private void GetInstallPath()
        {
            try
            {
                mLog.Info("Start get install path.");
                RegistryKey root = Registry.LocalMachine;
                RegistryKey mmsKey = root.OpenSubKey(mRegistryKey);
                if (mmsKey == null)
                {
                    throw new Exception("注册表项不存在，读取卸载信息失败.");
                }
                this.mInstallPath = mmsKey.GetValue("UninstallString") as string;
                mLog.Info("Get install path success,path:[{0}]", this.mInstallPath);
            }
            catch (Exception e)
            {
                mLog.Error("An error has occurr in the get install path.error:{0}", e.ToString());
                throw;
            }
        }

        private void RemoveFiles()
        {
            try
            {
                mLog.Info("Start remove file.");
                string[] files = Directory.GetFiles(this.mInstallPath, "*", SearchOption.AllDirectories);
                long totalNum = files.Count();
                long removeNum = 0;
                int progress = 0;
                foreach (string file in files)
                {
                    mLog.Info("Remove file:[{0}]", file);
                    try
                    {
                        File.Delete(file);
                    }
                    catch (Exception e)
                    {
                        mLog.Warn("An error has occurr in the rmove file,error:{0}", e.ToString());
                    }
                    finally
                    {
                        removeNum++;
                        progress += (int)Math.Ceiling(((double)removeNum / totalNum) * 70);
                        process.RefreshProgressBar(file, progress);
                    }
                }
                //mLog.Info("Remove install folder.");
                //Directory.Delete(this.mInstallPath, true);
            }
            catch (Exception e)
            {
                mLog.Warn("An error has occurr in the rmove file,error:{0}", e.ToString());
                throw;
            }
        }

        private void RemoveDestopShorcut()
        {
            string destopShorcut = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), "Mongodb Manager Studion.lnk");
            mLog.Info("Start remove desktopShorcut:[{0}]", destopShorcut);
            if (File.Exists(destopShorcut))
            {
                File.Delete(destopShorcut);
            }
        }

        private void RemoveRegistry()
        {
            try
            {
                mLog.Info("Start remove registry.");
                RegistryKey root = Registry.LocalMachine;
                RegistryKey mmsKey = root.OpenSubKey(mRegistryKey);
                if (mmsKey != null)
                {
                    root.DeleteSubKey(mRegistryKey);
                }
            }
            catch (Exception e)
            {
                mLog.Warn("An error has occurr in the remove registry,error:{0}", e.ToString());
                throw;
            }
        }
    }
}
