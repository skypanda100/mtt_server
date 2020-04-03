#!/bin/sh
forever start -l /var/www/mtt/server/log/forever.log -o /var/www/mtt/server/log/out.log -e /var/www/mtt/server/log/err.log -a ./bin/www

