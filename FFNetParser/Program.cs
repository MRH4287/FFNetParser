using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading;

namespace FFNetParser
{
    class Program
    {
        static string basePath = "../../";
        static string output = "../../ffnetlist.user.js";

        static Tuple<string, string>[] includes = new Tuple<string, string>[]
        {
            new Tuple<string, string>("jQuery", "../../jquery-1.10.2.js"),
            new Tuple<string, string>("jQuery.ui", "../../jquery-ui.min.js"),
            new Tuple<string, string>("jQuery.colorpicker", "../../jquery-colorpicker.min.js")
        };

        static void Main(string[] args)
        {
           // using (var stream = File.OpenWrite(output))
            using(var writer = new StreamWriter(output))
            {
                //var writer = new StreamWriter(stream);

                // This Program is doing the work of putting everything together ;)
                Console.WriteLine("Go ...");

                StringBuilder outputBuilder = new StringBuilder();

                string baseFile = getFileContent("userscript.js");

                Regex versionSerach = new Regex(@"this.version ?= ?\'([0-9.]+)\'\;", RegexOptions.IgnoreCase);
                var match = versionSerach.Match(baseFile);

                if (!match.Success)
                {
                    Console.WriteLine("Something is wrong with the File ... Can't find Version");
                    Console.Read();
                }

                outputBuilder.Append(getFileContent("header.js"));

                outputBuilder.Replace("_VERSION_", match.Groups[1].Value);

                addInludes(outputBuilder);

                

                outputBuilder.AppendLine("");
                outputBuilder.AppendLine("// -- Start Script --");
                outputBuilder.AppendLine("");

                writer.Write(outputBuilder.ToString());
                writer.WriteLine(baseFile);
                writer.WriteLine(getFileContent("footer.js"));

                //var current = outputBuilder.ToString();

                //current += baseFile + Environment.NewLine + getFileContent("footer.js");




                //writer.Write(current);

            }

        }


        private static void addInludes(StringBuilder target)
        {
            var template = getFileContent("includeTemplate.js");

            foreach (var include in includes)
            {
                StringBuilder includeData = new StringBuilder(template);

                includeData.Replace("_VARIABLE_", include.Item1);
                includeData.Replace("_CODE_", getFileContent(include.Item2));

                target.AppendLine(includeData.ToString());

            }

        }

        private static string getFileContent(string filename)
        {
            var path = basePath + filename;

            if (File.Exists(path))
            {
                var data = File.OpenText(path);
                return data.ReadToEnd();

            }
            return null;

        }

    }
}
