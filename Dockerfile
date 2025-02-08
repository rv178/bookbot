FROM archlinux:base-devel
LABEL maintainers="Aakash Sen Sharma <aakashsensharma@gmail.com>, rv178"

WORKDIR /opt/app
COPY . .

RUN pacman -Sy --noconfirm cairo pango libjpeg-turbo giflib libsvgtiny nodejs yarn
RUN yarn install && yarn build

CMD ["node", "dist/index.js"]
