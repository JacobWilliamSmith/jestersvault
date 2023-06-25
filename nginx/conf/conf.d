server {
    listen 80;
    listen [::]:80;

    server_name jestersvault.com www.jestersvault.com;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://jestersvault.com$request_uri;
    }
}
