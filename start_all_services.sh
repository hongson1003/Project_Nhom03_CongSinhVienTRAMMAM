#!/bin/bash

# Khởi động từng dịch vụ một
cd "AuthenticationService" && npm start &
cd "InfoService" && npm start &
cd "CourseService" && npm start &
cd "EnrollmentService" && npm start &
cd "GradeService" && npm start &
cd "PaymentService" && npm start &
cd "ApiGatewayService" && npm start &

# Chờ tất cả các tiến trình con kết thúc
wait

#allow: chmod +x start_all_services.sh

#run: bash start_all_services.sh