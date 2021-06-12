import os
import shutil
import errno

def copyanything(src, dst):
    try:
        shutil.copytree(src, dst)
    except OSError as exc:
        if exc.errno == errno.ENOTDIR:
            shutil.copy(src, dst)
        else:
            raise


build = "./docs"
index = "index.md"

if os.path.exists(build) and os.path.isdir(build):
    shutil.rmtree(build)

copyanything("./src", build)

for root, dirs, files in os.walk(build):
    for f in files:
        if f == index:
            mdname = os.path.join(root, f)
            htmlname = mdname[:-2] + "html"
            dirname = os.path.basename(root)
            print(f"{mdname} -> {htmlname}")

            if dirs:
                with open(mdname, "a") as f:
                    f.write("\n")
                    for d in dirs:
                        f.write(f"- [{d}](./{d.replace(' ', '%20')})\n")
                    f.write("\n")
                    f.close()
            command = f'pandoc -f commonmark -t html5 --resource-path "{root}" -s "{mdname}" -o "{htmlname}" --self-contained --css=style.css --metadata pagetitle="{dirname}"'
            os.system(command)
            os.remove(mdname)
