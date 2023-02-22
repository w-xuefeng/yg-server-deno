if hash deno 2>/dev/null; then
  deno --version
  echo '🥰 Deno has been installed before!'
else
  echo '🚀 Start installing Deno ...'
  curl -fsSL https://deno.land/install.sh | sh
  sudo ln -s $HOME/.deno/bin/deno /usr/bin
  deno --version
  echo '🥰 Deno has been installed!'
fi