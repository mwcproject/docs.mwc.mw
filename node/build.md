# MWC - Build, Configuration, and Running

## Supported Platforms

Longer term, most platforms will likely be supported to some extent.
MWC's programming language `rust` has build targets for most platforms.

What's working so far:

* Linux x86\_64 and macOS [MWC + mining + development]
* Windows 10 yet [MWC builds, some slowness but overall can work]

## Requirements

* rust: Install using rustup: https://rustup.rs
  * MWC currently does not support a minimum version of Rust, it is recommended to build using the latest version.
  * If rust is already installed, you can update to the latest version by running `rustup update`.
* clang
* ncurses and libs (ncurses, ncursesw5)
* zlib libs (zlib1g-dev or zlib-devel)
* pkg-config
* libssl-dev
* linux-headers (reported needed on Alpine linux)
* llvm

For Debian-based distributions (Debian, Ubuntu, Mint, etc), all in one line (except Rust):

```sh
apt install build-essential cmake git libgit2-dev clang libncurses5-dev libncursesw5-dev zlib1g-dev pkg-config libssl-dev llvm
```

For Macintosh:

```sh
xcode-select --install
brew install pkg-config
brew install openssl
brew install llvm
```

## Build steps

```sh
git clone https://github.com/mwcproject/mwc-node
cd mwc-node
cargo build --release
```

MWC can also be built in debug mode (without the `--release` flag, but using the `--debug` or the `--verbose` flag) but this will render fast sync prohibitively slow due to the large overhead of cryptographic operations.

## Build errors

See [Troubleshooting](https://github.com/mimblewimble/docs/wiki/Troubleshooting)

## What was built?

A successful build gets you:

* `target/release/mwc` - the main mwc binary

All data, configuration and log files created and used by mwc are located in the hidden
`~/.mwc` directory (under your user home directory) by default. You can modify all configuration
values by editing the file `~/.mwc/main/mwc-server.toml`.

It is also possible to have mwc create its data files in the current directory. To do this, run

```sh
mwc server config
```

Which will generate a `mwc-server.toml` file in the current directory, pre-configured to use
the current directory for all of its data. Running mwc from a directory that contains a
`mwc-server.toml` file will use the values in that file instead of the default
`~/.mwc/main/mwc-server.toml`.

While testing, put the mwc binary on your path like this:

```sh
export PATH=`pwd`/target/release:$PATH
```

assuming you are running from the root directory of your MWC installation.

You can then run `mwc` directly (try `mwc help` for more options).

## Configuration

MWC attempts to run with sensible defaults, and can be further configured via
the `mwc-server.toml` file. This file is generated by MWC on its first run, and
contains documentation on each available option.

While it's recommended that you perform all MWC server configuration via
`mwc-server.toml`, it's also possible to supply command line switches to MWC that
override any settings in the file.

For help on mwc commands and their switches, try:

```sh
mwc help
mwc server --help
mwc client --help
```

## Docker

```sh
docker build -t mwc -f etc/Dockerfile .
```
For floonet, use `etc/Dockerfile.floonet` instead

You can bind-mount your mwc cache to run inside the container.

```sh
docker run -it -d -v $HOME/.mwc:/root/.mwc mwc
```
If you prefer to use a docker named volume, you can pass `-v dotmwc:/root/.mwc` instead.
Using a named volume copies default configurations upon volume creation.

## Cross-platform builds

Rust (cargo) can build mwc for many platforms, so in theory running `mwc`
as a validating node on your low powered device might be possible.
To cross-compile `mwc` on a x86 Linux platform and produce ARM binaries,
say, for a Raspberry Pi.

## Using mwc

The wiki page [Wallet User Guide](https://github.com/mimblewimble/docs/wiki/Wallet-User-Guide)
and linked pages have more information on what features we have,
troubleshooting, etc.

## Mining in MWC

Please note that all mining functions for MWC have moved into a separate, standalone package called
[mwc-miner](https://github.com/mwcproject/mwc-node-miner). Once your MWC code node is up and running,
you can start mining by building and running mwc-miner against your running MWC node.

For mwc-miner to be able to communicate with your MWC node, make sure that you have `enable_stratum_server = true`
in your `mwc-server.toml` configuration file and you have a wallet listener running (`mwc-wallet listen`). 