FROM archlinux:base-devel
MAINTAINER Aakash Sen Sharma <aakashsensharma@gmail.com>

WORKDIR /opt/app
COPY . .

RUN pacman -Sy --noconfirm cairo pango libjpeg-turbo giflib libsvgtiny nodejs npm
RUN npm install

CMD ["node", "."]
