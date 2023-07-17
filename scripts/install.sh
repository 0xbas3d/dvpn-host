#!/bin/bash

# Step 1: Update apt package index
sudo apt update

# Step 2: Install packages to allow apt to use a repository over HTTPS
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Step 3: Add the Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Step 4: Add the Docker repository to apt sources
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Step 5: Update apt package index again
sudo apt update

# Step 6: Install Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add the current user to the docker group
sudo groupadd docker
sudo usermod -aG docker $USER

#Install socat
sudo apt-get install -y socat


# Configure Docker to run without sudo
sudo systemctl enable docker
sudo systemctl start docker

sudo chmod 666 /var/run/docker.sock

# Print a message to inform the user about the next steps
echo "Please restart the system for changes to take effect"
