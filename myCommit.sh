echo "preparing to push changes"&&
echo "Please give your commit message"&&
read msg&&
echo "Got commit message: $msg!"&&
git status&&
git add -A&&
git commit -m "$msg"&&
git push&&
echo "done!!"