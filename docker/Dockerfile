FROM ubuntu:latest
ENV TZ=Europe/Budapest

RUN echo $TZ > /etc/timezone && \
	apt-get update && \
	apt-get install -y tzdata && \
	rm /etc/localtime && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \
	apt-get install -y curl git lsb-release && \
	curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
	apt-get install -y nodejs && \
	curl -fsSL https://pgp.mongodb.com/server-6.0.asc | gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor && \
	echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
	apt-get update && apt-get install -y mongodb-org && \
	rm -rf /var/lib/apt/lists/

RUN	cd ~/ && git clone https://github.com/pzoli/shoppingcard-models.git
RUN	cd ~/shoppingcard-models && npm install

RUN cd ~/ && git clone https://github.com/pzoli/shoppingcard-api.git
RUN cd ~/shoppingcard-api && npm install

CMD mongod --dbpath /data/db --logpath /data/db/log --fork -f /etc/mongod.conf && cd ~/shoppingcard-api && npm run dev

EXPOSE 8080
