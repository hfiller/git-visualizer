#!/bin/bash

#Colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

spinner()
{
	tput civis 
	local pid=$1
	local delay=0.1
	local spinstr='|/-\';
	while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
		local temp=${spinstr#?}
		printf "  "${spinstr%"$temp"}"  ";
		local spinstr=$temp${spinstr%"$temp"}
		sleep $delay
		printf "\b\b\b\b\b"
	done
	printf "    \b\b\b\b";
	printf '\r'; printf ' %0.s' {0..40};
	tput cnorm
}

cd ../downloads/;
rm -rf test-repo;
echo -n "downloading repo, please wait...";
git clone $1 test-repo & spinner $!;
printf '\r'; printf ' %0.s' {0..40};
echo -e "\r${GREEN}✓ ${NC}complete";
cd ../HackTheNorth;
node scanner.js;