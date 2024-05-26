#!/bin/bash

# Di chuyển đến thư mục gốc chứa các dịch vụ
cd D:/KTPM/BaiTapLon/Project

# Lặp qua các thư mục dịch vụ
for service_dir in */; do
    # Kiểm tra xem thư mục hiện tại có phải là ApiGatewayService hay không
    if [ "$service_dir" != "ApiGatewayService/" ]; then
        # Di chuyển đến thư mục dịch vụ
        cd "$service_dir"
        
        # Thực hiện lệnh migrate
        echo "Migrating tables for service: $service_dir"
        npx sequelize-cli db:migrate

        # Thực hiện lệnh seeders
        echo "Seeding data for service: $service_dir"
        npx sequelize-cli db:seed:all
        
        # Di chuyển trở lại thư mục gốc
        cd ..
    fi
done

# run: bash migrate_all.sh