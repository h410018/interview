核心組件（3個服務+3個存儲）
API Gateway：統一入口，處理認證和路由

Upload Service：文件上傳 → 存到 對象存儲（S3）

Search Service：全文檢索 → 查 Elasticsearch（倒排索引）

Metadata DB：書名校驗等 → 用 PostgreSQL

![描述图片的文字](pic.png)