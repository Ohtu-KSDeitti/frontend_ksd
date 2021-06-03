#!/bin/bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo docker kill $(docker ps -q)
sudo docker system prune -a -f
sudo cp /home/ec2-user/.env /home/ec2-user/frontend_ksd
sudo docker build /home/ec2-user/frontend_ksd/ -t frontend_ksd