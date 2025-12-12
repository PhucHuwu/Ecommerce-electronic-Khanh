# BÁO CÁO PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

# WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN THIẾT BỊ ĐIỆN TỬ

---

## MỤC LỤC

1. [Giới thiệu tổng quan](#1-giới-thiệu-tổng-quan)
2. [Phân tích yêu cầu hệ thống](#2-phân-tích-yêu-cầu-hệ-thống)
3. [Biểu đồ Use Case](#3-biểu-đồ-use-case)
4. [Biểu đồ phân cấp chức năng](#4-biểu-đồ-phân-cấp-chức-năng)
5. [Sơ đồ luồng dữ liệu](#5-sơ-đồ-luồng-dữ-liệu)
    - 5.1 [Biểu đồ luồng dữ liệu mức ngữ cảnh](#51-biểu-đồ-luồng-dữ-liệu-mức-ngữ-cảnh)
    - 5.2 [Biểu đồ luồng dữ liệu mức đỉnh](#52-biểu-đồ-luồng-dữ-liệu-mức-đỉnh)
    - 5.3 [Sơ đồ mức dưới đỉnh](#53-sơ-đồ-mức-dưới-đỉnh)
6. [Sơ đồ lớp](#6-sơ-đồ-lớp)
7. [Mô hình thực thể liên kết (ERD)](#7-mô-hình-thực-thể-liên-kết-erd)
8. [Kết luận](#8-kết-luận)

---

## 1. Giới thiệu tổng quan

### 1.1. Mô tả hệ thống

Hệ thống Website Thương mại điện tử bán thiết bị điện tử (GEARVN Clone) là một nền tảng thương mại điện tử chuyên cung cấp các sản phẩm công nghệ và thiết bị điện tử bao gồm: máy tính để bàn (PC), laptop, màn hình, linh kiện máy tính (VGA, CPU, RAM, Mainboard, Ổ cứng, Nguồn, Tản nhiệt, Case), và các thiết bị ngoại vi (bàn phím, chuột).

Hệ thống được phát triển trên nền tảng Next.js - một framework React hiện đại, sử dụng MongoDB làm cơ sở dữ liệu và được triển khai theo kiến trúc Server-Side Rendering (SSR) kết hợp với Client-Side Rendering (CSR) để tối ưu hóa trải nghiệm người dùng.

### 1.2. Mục tiêu của hệ thống

-   Cung cấp giao diện trực quan, thân thiện để khách hàng có thể dễ dàng tìm kiếm và xem thông tin sản phẩm
-   Hỗ trợ phân loại sản phẩm theo danh mục để thuận tiện cho việc duyệt sản phẩm
-   Cung cấp chức năng tìm kiếm sản phẩm nhanh chóng và hiệu quả
-   Cho phép người dùng lưu các sản phẩm yêu thích vào danh sách wishlist
-   Hiển thị thông tin khuyến mãi và tin tức công nghệ cập nhật

### 1.3. Phạm vi hệ thống

Hệ thống hiện tại tập trung vào các chức năng hiển thị thông tin cho khách hàng (frontend), bao gồm:

-   Hiển thị trang chủ với các sản phẩm nổi bật
-   Quản lý danh mục sản phẩm
-   Xem chi tiết sản phẩm
-   Tìm kiếm sản phẩm
-   Quản lý danh sách yêu thích
-   Hiển thị tin tức và khuyến mãi

---

## 2. Phân tích yêu cầu hệ thống

### 2.1. Yêu cầu chức năng

| STT | Chức năng                  | Mô tả                                                                                    |
| --- | -------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | Xem trang chủ              | Hiển thị banner quảng cáo, danh mục sản phẩm, sản phẩm bán chạy theo từng loại           |
| 2   | Xem danh mục sản phẩm      | Hiển thị danh sách tất cả danh mục sản phẩm có trong hệ thống                            |
| 3   | Xem sản phẩm theo danh mục | Lọc và hiển thị sản phẩm theo danh mục được chọn                                         |
| 4   | Xem chi tiết sản phẩm      | Hiển thị thông tin chi tiết của sản phẩm bao gồm hình ảnh, giá, thông số kỹ thuật, mô tả |
| 5   | Tìm kiếm sản phẩm          | Tìm kiếm sản phẩm theo tên hoặc từ khóa                                                  |
| 6   | Quản lý sản phẩm yêu thích | Thêm/xóa sản phẩm vào danh sách yêu thích, xem danh sách yêu thích                       |
| 7   | Xem tin tức                | Hiển thị danh sách tin tức và chi tiết bài viết                                          |
| 8   | Xem khuyến mãi             | Hiển thị danh sách chương trình khuyến mãi và chi tiết khuyến mãi                        |

### 2.2. Yêu cầu phi chức năng

| STT | Yêu cầu          | Mô tả                                                           |
| --- | ---------------- | --------------------------------------------------------------- |
| 1   | Hiệu năng        | Trang web phải tải nhanh, thời gian phản hồi dưới 3 giây        |
| 2   | Khả năng mở rộng | Hệ thống có thể mở rộng để thêm nhiều sản phẩm và chức năng mới |
| 3   | Tương thích      | Hỗ trợ các trình duyệt phổ biến và thiết bị di động             |
| 4   | Bảo mật          | Bảo vệ thông tin người dùng và dữ liệu hệ thống                 |
| 5   | Khả dụng         | Hệ thống hoạt động 24/7 với độ khả dụng cao                     |

### 2.3. Danh sách các thực thể chính

| STT | Thực thể               | Mô tả                                     |
| --- | ---------------------- | ----------------------------------------- |
| 1   | Product (Sản phẩm)     | Lưu trữ thông tin về các sản phẩm điện tử |
| 2   | Category (Danh mục)    | Phân loại các sản phẩm theo nhóm          |
| 3   | News (Tin tức)         | Lưu trữ các bài viết tin tức công nghệ    |
| 4   | Promotion (Khuyến mãi) | Thông tin về các chương trình khuyến mãi  |

---

## 3. Biểu đồ Use Case

### 3.1. Mô tả tác nhân

| Tác nhân              | Mô tả                                                   |
| --------------------- | ------------------------------------------------------- |
| Khách hàng (Customer) | Người dùng truy cập website để xem và tìm kiếm sản phẩm |
| Hệ thống (System)     | Xử lý các yêu cầu và trả về dữ liệu tương ứng           |

### 3.2. Biểu đồ Use Case tổng quát

```plantuml
@startuml Use Case Diagram
left to right direction
skinparam linetype ortho
skinparam packageStyle rectangle
skinparam actorStyle awesome

actor "Khách hàng" as Customer

rectangle "Hệ thống Website Thương mại điện tử" {
    usecase "Xem trang chủ" as UC1
    usecase "Xem\ndanh\nmục\nsản\nphẩm" as UC2
    usecase "Xem sản\nphẩm theo\ndanh mục" as UC3
    usecase "Xem chi tiết sản phẩm" as UC4
    usecase "Tìm kiếm sản phẩm" as UC5
    usecase "Quản lý sản phẩm yêu thích" as UC6
    usecase "Thêm sản phẩm yêu thích" as UC6a
    usecase "Xóa sản phẩm yêu thích" as UC6b
    usecase "Xem danh sách yêu thích" as UC6c
    usecase "Xem tin tức" as UC7
    usecase "Xem danh sách tin tức" as UC7a
    usecase "Xem chi tiết tin tức" as UC7b
    usecase "Xem khuyến mãi" as UC8
    usecase "Xem danh sách khuyến mãi" as UC8a
    usecase "Xem chi tiết khuyến mãi" as UC8b
}

Customer --> UC1
Customer --> UC2
Customer --> UC3
Customer --> UC4
Customer --> UC5
Customer --> UC6
Customer --> UC7
Customer --> UC8

UC6 ..> UC6a
UC6 ..> UC6b
UC6 ..> UC6c

UC7 ..> UC7a
UC7 ..> UC7b

UC8 ..> UC8a
UC8 ..> UC8b

UC3 ..> UC2

@enduml
```

### 3.3. Mô tả chi tiết các Use Case

#### UC1: Xem trang chủ

| Thuộc tính           | Mô tả                                                                                                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên Use Case         | Xem trang chủ                                                                                                                                                                                                                      |
| Tác nhân             | Khách hàng                                                                                                                                                                                                                         |
| Mô tả                | Người dùng truy cập trang chủ để xem các thông tin tổng quan                                                                                                                                                                       |
| Điều kiện tiên quyết | Không có                                                                                                                                                                                                                           |
| Luồng chính          | 1. Người dùng truy cập trang chủ<br>2. Hệ thống hiển thị banner quảng cáo<br>3. Hệ thống hiển thị danh mục sản phẩm<br>4. Hệ thống hiển thị các sản phẩm bán chạy theo từng danh mục<br>5. Hệ thống hiển thị tin tức và khuyến mãi |
| Kết quả              | Trang chủ được hiển thị đầy đủ thông tin                                                                                                                                                                                           |

#### UC2: Xem danh mục sản phẩm

| Thuộc tính           | Mô tả                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên Use Case         | Xem danh mục sản phẩm                                                                                                                                         |
| Tác nhân             | Khách hàng                                                                                                                                                    |
| Mô tả                | Người dùng xem tất cả các danh mục sản phẩm có trong hệ thống                                                                                                 |
| Điều kiện tiên quyết | Không có                                                                                                                                                      |
| Luồng chính          | 1. Người dùng xem phần danh mục trên trang chủ<br>2. Hệ thống lấy danh sách danh mục từ cơ sở dữ liệu<br>3. Hệ thống hiển thị danh sách danh mục kèm hình ảnh |
| Kết quả              | Danh sách danh mục được hiển thị                                                                                                                              |

#### UC3: Xem sản phẩm theo danh mục

| Thuộc tính           | Mô tả                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên Use Case         | Xem sản phẩm theo danh mục                                                                                                                        |
| Tác nhân             | Khách hàng                                                                                                                                        |
| Mô tả                | Người dùng xem các sản phẩm thuộc một danh mục cụ thể                                                                                             |
| Điều kiện tiên quyết | Danh mục tồn tại trong hệ thống                                                                                                                   |
| Luồng chính          | 1. Người dùng chọn một danh mục<br>2. Hệ thống lấy danh sách sản phẩm thuộc danh mục đó<br>3. Hệ thống hiển thị danh sách sản phẩm với các bộ lọc |
| Luồng thay thế       | Nếu không tìm thấy danh mục, hiển thị thông báo lỗi                                                                                               |
| Kết quả              | Danh sách sản phẩm theo danh mục được hiển thị                                                                                                    |

#### UC4: Xem chi tiết sản phẩm

| Thuộc tính           | Mô tả                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên Use Case         | Xem chi tiết sản phẩm                                                                                                                                                            |
| Tác nhân             | Khách hàng                                                                                                                                                                       |
| Mô tả                | Người dùng xem thông tin chi tiết của một sản phẩm                                                                                                                               |
| Điều kiện tiên quyết | Sản phẩm tồn tại trong hệ thống                                                                                                                                                  |
| Luồng chính          | 1. Người dùng chọn một sản phẩm<br>2. Hệ thống lấy thông tin chi tiết sản phẩm<br>3. Hệ thống hiển thị hình ảnh, giá, thông số, mô tả<br>4. Hệ thống hiển thị sản phẩm liên quan |
| Luồng thay thế       | Nếu không tìm thấy sản phẩm, hiển thị trang 404                                                                                                                                  |
| Kết quả              | Chi tiết sản phẩm được hiển thị                                                                                                                                                  |

#### UC5: Tìm kiếm sản phẩm

| Thuộc tính           | Mô tả                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tên Use Case         | Tìm kiếm sản phẩm                                                                                                                                            |
| Tác nhân             | Khách hàng                                                                                                                                                   |
| Mô tả                | Người dùng tìm kiếm sản phẩm theo từ khóa                                                                                                                    |
| Điều kiện tiên quyết | Không có                                                                                                                                                     |
| Luồng chính          | 1. Người dùng nhập từ khóa tìm kiếm<br>2. Người dùng nhấn nút tìm kiếm<br>3. Hệ thống tìm sản phẩm khớp với từ khóa<br>4. Hệ thống hiển thị kết quả tìm kiếm |
| Luồng thay thế       | Nếu không tìm thấy sản phẩm, hiển thị thông báo không có kết quả                                                                                             |
| Kết quả              | Danh sách sản phẩm khớp với từ khóa được hiển thị                                                                                                            |

#### UC6: Quản lý sản phẩm yêu thích

| Thuộc tính           | Mô tả                                                                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên Use Case         | Quản lý sản phẩm yêu thích                                                                                                                                             |
| Tác nhân             | Khách hàng                                                                                                                                                             |
| Mô tả                | Người dùng quản lý danh sách sản phẩm yêu thích                                                                                                                        |
| Điều kiện tiên quyết | Không có                                                                                                                                                               |
| Luồng chính          | 1. Người dùng có thể thêm sản phẩm vào danh sách yêu thích<br>2. Người dùng có thể xóa sản phẩm khỏi danh sách<br>3. Người dùng có thể xem toàn bộ danh sách yêu thích |
| Kết quả              | Danh sách yêu thích được cập nhật/hiển thị                                                                                                                             |

---

## 4. Biểu đồ phân cấp chức năng

Biểu đồ phân cấp chức năng (Function Hierarchy Diagram - FHD) thể hiện cấu trúc phân cấp của các chức năng trong hệ thống, từ chức năng tổng quát đến các chức năng chi tiết.

```plantuml
@startwbs Function Hierarchy Diagram
skinparam packageStyle rectangle

* HỆ THỐNG WEBSITE\nTHƯƠNG MẠI ĐIỆN TỬ
** 1. QUẢN LÝ\nSẢN PHẨM
*** 1.1 Hiển thị\ndanh sách sản phẩm
*** 1.2 Xem chi tiết\nsản phẩm
*** 1.3 Tìm kiếm\nsản phẩm
*** 1.4 Lọc sản phẩm\ntheo tiêu chí
** 2. QUẢN LÝ\nDANH MỤC
*** 2.1 Hiển thị\ndanh sách danh mục
*** 2.2 Xem sản phẩm\ntheo danh mục
** 3. QUẢN LÝ\nTIN TỨC
*** 3.1 Hiển thị\ndanh sách tin tức
*** 3.2 Xem chi tiết\ntin tức
** 4. QUẢN LÝ\nKHUYẾN MÃI
*** 4.1 Hiển thị\ndanh sách khuyến mãi
*** 4.2 Xem chi tiết\nkhuyến mãi
** 5. QUẢN LÝ\nYÊU THÍCH
*** 5.1 Thêm sản phẩm\nyêu thích
*** 5.2 Xóa sản phẩm\nyêu thích
*** 5.3 Xem danh sách\nyêu thích
*** 5.4 Xóa tất cả\nyêu thích
@endwbs
```

### Bảng mô tả chức năng

| Mã chức năng | Tên chức năng                 | Mô tả                                                     |
| ------------ | ----------------------------- | --------------------------------------------------------- |
| 1            | Quản lý sản phẩm              | Các chức năng liên quan đến hiển thị và tìm kiếm sản phẩm |
| 1.1          | Hiển thị danh sách sản phẩm   | Hiển thị danh sách sản phẩm theo các tiêu chí khác nhau   |
| 1.2          | Xem chi tiết sản phẩm         | Hiển thị thông tin chi tiết của một sản phẩm              |
| 1.3          | Tìm kiếm sản phẩm             | Tìm kiếm sản phẩm theo tên hoặc từ khóa                   |
| 1.4          | Lọc sản phẩm theo tiêu chí    | Lọc sản phẩm theo thương hiệu, giá, thông số              |
| 2            | Quản lý danh mục              | Các chức năng liên quan đến danh mục sản phẩm             |
| 2.1          | Hiển thị danh sách danh mục   | Hiển thị tất cả danh mục có trong hệ thống                |
| 2.2          | Xem sản phẩm theo danh mục    | Hiển thị sản phẩm thuộc một danh mục cụ thể               |
| 3            | Quản lý tin tức               | Các chức năng liên quan đến tin tức                       |
| 3.1          | Hiển thị danh sách tin tức    | Hiển thị danh sách các bài viết tin tức                   |
| 3.2          | Xem chi tiết tin tức          | Hiển thị nội dung chi tiết bài viết                       |
| 4            | Quản lý khuyến mãi            | Các chức năng liên quan đến khuyến mãi                    |
| 4.1          | Hiển thị danh sách khuyến mãi | Hiển thị các chương trình khuyến mãi                      |
| 4.2          | Xem chi tiết khuyến mãi       | Hiển thị chi tiết chương trình khuyến mãi                 |
| 5            | Quản lý yêu thích             | Các chức năng liên quan đến danh sách yêu thích           |
| 5.1          | Thêm sản phẩm yêu thích       | Thêm sản phẩm vào danh sách yêu thích                     |
| 5.2          | Xóa sản phẩm yêu thích        | Xóa sản phẩm khỏi danh sách yêu thích                     |
| 5.3          | Xem danh sách yêu thích       | Hiển thị tất cả sản phẩm trong danh sách yêu thích        |
| 5.4          | Xóa tất cả yêu thích          | Xóa toàn bộ sản phẩm trong danh sách yêu thích            |

---

## 5. Sơ đồ luồng dữ liệu

### 5.1. Biểu đồ luồng dữ liệu mức ngữ cảnh

Biểu đồ luồng dữ liệu mức ngữ cảnh (Context Diagram - Level 0) thể hiện cái nhìn tổng quan về hệ thống và các tác nhân bên ngoài tương tác với hệ thống.

```plantuml
@startuml Context Diagram - Level 0

skinparam rectangle {
    BackgroundColor<<process>> LightBlue
    BorderColor<<process>> Navy
}

actor "Khách hàng" as Customer

rectangle "0\nHỆ THỐNG WEBSITE\nTHƯƠNG MẠI ĐIỆN TỬ" <<process>> as System

Customer -right-> System : Từ khóa tìm kiếm
Customer -right-> System : Yêu cầu xem danh mục
Customer -right-> System : Yêu cầu xem sản phẩm
Customer -right-> System : Thao tác yêu thích
Customer -right-> System : Yêu cầu xem tin tức
Customer -right-> System : Yêu cầu xem khuyến mãi

System -left-> Customer : Danh sách sản phẩm
System -left-> Customer : Chi tiết sản phẩm
System -left-> Customer : Danh sách danh mục
System -left-> Customer : Kết quả tìm kiếm
System -left-> Customer : Danh sách yêu thích
System -left-> Customer : Danh sách tin tức
System -left-> Customer : Thông tin khuyến mãi

@enduml
```

### 5.2. Biểu đồ luồng dữ liệu mức đỉnh

Biểu đồ luồng dữ liệu mức đỉnh (Level 1 DFD) chi tiết hóa các tiến trình chính trong hệ thống.

```plantuml
@startuml DFD Level 1
skinparam rectangle {
    BackgroundColor<<process>> LightBlue
    BorderColor<<process>> Navy
}
skinparam database {
    BackgroundColor LightYellow
    BorderColor Orange
}

actor "Khách hàng" as Customer

rectangle "1.0 XỬ LÝ SẢN PHẨM" <<process>> as P1
rectangle "2.0 XỬ LÝ DANH MỤC" <<process>> as P2
rectangle "3.0 XỬ LÝ TIN TỨC" <<process>> as P3
rectangle "4.0 XỬ LÝ KHUYẾN MÃI" <<process>> as P4
rectangle "5.0 XỬ LÝ YÊU THÍCH" <<process>> as P5

database "D1 PRODUCT" as D1
database "D2 CATEGORY" as D2
database "D3 NEWS" as D3
database "D4 PROMOTION" as D4
database "D5 LOCAL STORAGE FAVORITES" as D5

Customer --> P1 : Từ khóa\ntìm kiếm\nSlug\nsản phẩm
P1 --> Customer : Danh sách\nsản phẩm\nChi tiết\nsản phẩm

Customer --> P2 : Yêu cầu\ndanh mục\nSlug\ndanh mục
P2 --> Customer : Danh sách\ndanh mục\nSản phẩm\ntheo danh mục

Customer --> P3 : Yêu cầu\ntin tức\nSlug\ntin tức
P3 --> Customer : Danh sách\ntin tức\nChi tiết\ntin tức

Customer --> P4 : Yêu cầu\nthông tin\nkhuyến mãi\nSlug\nkhuyến mãi
P4 --> Customer : Danh sách\nkhuyến mãi\nChi tiết\nkhuyến mãi

Customer --> P5 : Thêm/Xóa\nyêu thích\nXem\ndanh sách
P5 --> Customer : Danh sách\nyêu thích\nTrạng thái\nyêu thích

P1 <--> D1 : Truy vấn/\nKết quả
P2 <--> D2 : Truy vấn/\nKết quả
P2 --> P1 : Tên danh mục
P3 <--> D3 : Truy vấn/\nKết quả
P4 <--> D4 : Truy vấn/\nKết quả
P5 <--> D5 : Lưu/Đọc
P5 --> P1 : ID sản phẩm\nyêu thích

@enduml
```

### 5.3. Sơ đồ mức dưới đỉnh

#### 5.3.1. Sơ đồ mức dưới đỉnh 1: Xử lý sản phẩm

```plantuml
@startuml DFD Level 2 - Product Processing
skinparam rectangle {
    BackgroundColor<<process>> LightBlue
    BorderColor<<process>> Navy
}
skinparam database {
    BackgroundColor LightYellow
    BorderColor Orange
}

actor "Khách hàng" as Customer

rectangle "1.1 HIỂN THỊ DANH SÁCH SẢN PHẨM" <<process>> as P1_1
rectangle "1.2 XEM CHI TIẾT SẢN PHẨM" <<process>> as P1_2
rectangle "1.3 TÌM KIẾM SẢN PHẨM" <<process>> as P1_3
rectangle "1.4 LỌC SẢN PHẨM" <<process>> as P1_4

database "D1\nPRODUCT" as D1

Customer --> P1_1 : Yêu cầu\ndanh sách
Customer --> P1_2 : Slug sản phẩm
Customer --> P1_3 : Từ khóa\ntìm kiếm
Customer --> P1_4 : Tiêu chí lọc\n(thương hiệu, giá)

P1_1 --> Customer : Danh sách\nsản phẩm
P1_2 --> Customer : Chi tiết\nsản phẩm
P1_3 --> Customer : Kết quả\ntìm kiếm
P1_4 --> Customer : Sản phẩm\nđã lọc

P1_1 <--> D1 : Truy vấn\ntất cả/\nDanh sách\nsản phẩm
P1_2 <--> D1 : Truy vấn\ntheo slug/\nThông tin\nsản phẩm
P1_3 <--> D1 : Truy vấn\ntheo tên/\nSản phẩm\nkhớp
P1_4 <--> D1 : Truy vấn\ntheo tiêu chí/\nSản phẩm\nphù hợp

P1_2 --> P1_1 : Danh mục\nsản phẩm

@enduml
```

#### 5.3.2. Sơ đồ mức dưới đỉnh 2: Xử lý danh mục

```plantuml
@startuml DFD Level 2 - Category Processing
skinparam rectangle {
    BackgroundColor<<process>> LightBlue
    BorderColor<<process>> Navy
}
skinparam database {
    BackgroundColor LightYellow
    BorderColor Orange
}
actor "Khách hàng" as Customer

rectangle "2.1 HIỂN THỊ DANH SÁCH DANH MỤC" <<process>> as P2_1
rectangle "2.2 XEM SẢN PHẨM THEO DANH MỤC" <<process>> as P2_2

database "D1\nPRODUCT" as D1
database "D2\nCATEGORY" as D2

Customer --> P2_1 : Yêu cầu\ndanh mục
Customer --> P2_2 : Slug\ndanh mục

P2_1 --> Customer : Danh sách\ndanh mục
P2_2 --> Customer : Sản phẩm\ntheo danh mục

P2_1 <--> D2 : Truy vấn\ntất cả/\nDanh sách\ndanh mục
P2_2 <--> D2 : Truy vấn\ntheo slug/\nThông tin\ndanh mục
P2_2 <--> D1 : Truy vấn\ntheo category/\nDanh sách\nsản phẩm

@enduml
```

#### 5.3.3. Sơ đồ mức dưới đỉnh 3: Xử lý tin tức

```plantuml
@startuml DFD Level 2 - News Processing
skinparam rectangle {
    BackgroundColor<<process>> LightBlue
    BorderColor<<process>> Navy
}
skinparam database {
    BackgroundColor LightYellow
    BorderColor Orange
}

actor "Khách hàng" as Customer

rectangle "3.1 HIỂN THỊ DANH SÁCH TIN TỨC" <<process>> as P3_1
rectangle "3.2 XEM CHI TIẾT TIN TỨC" <<process>> as P3_2

database "D3\nNEWS" as D3

Customer --> P3_1 : Yêu cầu\ntin tức
Customer --> P3_2 : Slug\ntin tức

P3_1 --> Customer : Danh sách\ntin tức
P3_2 --> Customer : Chi tiết\ntin tức
P3_1 <--> D3 : Truy vấn\ntất cả/\nDanh sách\ntin tức
P3_2 <--> D3 : Truy vấn\ntheo slug/\nThông tin\ntin tức

P3_2 --> P3_1 : Danh mục\ntin tức

@enduml
```

#### 5.3.4. Sơ đồ mức dưới đỉnh 4: Xử lý khuyến mãi

```plantuml
@startuml DFD Level 2 - Promotion Processing
skinparam rectangle {
    BackgroundColor<<process>> LightBlue
    BorderColor<<process>> Navy
}
skinparam database {
    BackgroundColor LightYellow
    BorderColor Orange
}

actor "Khách hàng" as Customer

rectangle "4.1 HIỂN THỊ DANH SÁCH KHUYẾN MÃI" <<process>> as P4_1
rectangle "4.2 XEM CHI TIẾT KHUYẾN MÃI" <<process>> as P4_2

database "D4\nPROMOTION" as D4

Customer --> P4_1 : Yêu cầu\nkhuyến mãi
Customer --> P4_2 : Slug\nkhuyến mãi

P4_1 --> Customer : Danh sách\nkhuyến mãi
P4_2 --> Customer : Chi tiết\nkhuyến mãi

P4_1 <--> D4 : Truy vấn tất cả/\nDanh sách\nkhuyến mãi
P4_1 <--> D4 : Truy vấn featured/\nKhuyến mãi\nnổi bật
P4_2 <--> D4 : Truy vấn theo slug/\nThông tin\nkhuyến mãi

@enduml
```

#### 5.3.5. Sơ đồ mức dưới đỉnh 5: Xử lý yêu thích

```plantuml
@startuml DFD Level 2 - Wishlist Processing
skinparam rectangle {
    BackgroundColor<<process>> LightBlue
    BorderColor<<process>> Navy
}
skinparam database {
    BackgroundColor LightYellow
    BorderColor Orange
}

actor "Khách hàng" as Customer

rectangle "5.1 THÊM SẢN PHẨM YÊU THÍCH" <<process>> as P5_1
rectangle "5.2 XÓA SẢN PHẨM YÊU THÍCH" <<process>> as P5_2
rectangle "5.3 XEM DANH SÁCH YÊU THÍCH" <<process>> as P5_3
rectangle "5.4 XÓA TẤT CẢ YÊU THÍCH" <<process>> as P5_4

database "D1\nPRODUCT" as D1
database "D5\nLOCAL STORAGE\nFAVORITES" as D5

Customer --> P5_1 : ID sản\nphẩm
Customer --> P5_2 : ID sản\nphẩm
Customer --> P5_3 : Yêu cầu\nxem
Customer --> P5_4 : Yêu cầu\nxóa tất cả

P5_1 --> Customer : Xác nhận\nthêm
P5_2 --> Customer : Xác nhận\nxóa
P5_3 --> Customer : Danh sách\nsản phẩm\nyêu thích
P5_4 --> Customer : Xác nhận\nxóa tất cả

P5_1 <--> D5 : Thêm ID/\nDanh sách\ncập nhật
P5_2 <--> D5 : Xóa ID/\nDanh sách\ncập nhật
P5_3 <--> D5 : Đọc danh sách/\nDanh sách ID
P5_4 <--> D5 : Xóa tất cả/\nDanh sách rỗng

P5_3 <--> D1 : Truy vấn\ntheo ID/\nThông tin\nsản phẩm

@enduml
```

---

## 6. Sơ đồ lớp

Sơ đồ lớp (Class Diagram) thể hiện cấu trúc các lớp đối tượng trong hệ thống và mối quan hệ giữa chúng.

```plantuml
@startuml Class Diagram
skinparam classAttributeIconSize 0
skinparam class {
    BackgroundColor LightYellow
    BorderColor Black
    ArrowColor Black
}

class Product {
    +_id: String
    +slug: String
    +name: String
    +price: Number
    +originalPrice: Number
    +rating: Number
    +reviewCount: Number
    +mainImage: String
    +gallery: Array<String>
    +description: String
    +category: String
    +brand: String
    +badge: String
    +specs: Map<String, String>
    +variants: Array<ProductVariant>
    +highlightFeatures: Array<String>
    +createdAt: Date
    +updatedAt: Date
    --
    +getProducts(params): Product[]
    +getProductBySlug(slug): Product
    +searchProducts(keyword): Product[]
    +filterByCategory(category): Product[]
}

class ProductVariant {
    +_id: String
    +name: String
    +priceAdjustment: Number
}

class ProductSpecs {
    +cpu: String
    +ram: String
    +gpu: String
    +storage: String
    +display: String
    +weight: String
    +sensor: String
    +dpi: String
    +battery: String
    +connectivity: String
    +layout: String
    +switch: String
    +keycap: String
    +size: String
    +resolution: String
    +refreshRate: String
    +panelType: String
    +responseTime: String
    +cores: String
    +threads: String
    +baseClock: String
    +boostClock: String
    +socket: String
}

class Category {
    +_id: String
    +name: String
    +slug: String
    +image: String
    +createdAt: Date
    +updatedAt: Date
    --
    +getCategories(): Category[]
    +getCategoryBySlug(slug): Category
}

class News {
    +_id: String
    +slug: String
    +title: String
    +excerpt: String
    +content: String
    +image: String
    +author: String
    +publishedAt: Date
    +createdAt: Date
    +updatedAt: Date
    --
    +getNews(params): News[]
    +getNewsBySlug(slug): News
}

class Promotion {
    +_id: String
    +slug: String
    +title: String
    +description: String
    +image: String
    +discountPercent: Number
    +discountText: String
    +startDate: Date
    +endDate: Date
    +featured: Boolean
    +terms: Array<String>
    +createdAt: Date
    +updatedAt: Date
    --
    +getPromotions(params): Promotion[]
    +getPromotionBySlug(slug): Promotion
    +getFeaturedPromotions(): Promotion[]
}

class Wishlist {
    +favoriteIds: Array<String>
    --
    +addFavorite(productId): void
    +removeFavorite(productId): void
    +getFavorites(): String[]
    +clearAllFavorites(): void
    +isFavorite(productId): Boolean
}

Product "1" *-- "0..*" ProductVariant : contains
Product "1" *-- "1" ProductSpecs : has
Product "0..*" -- "1" Category : belongs to
Wishlist "0..*" -- "0..*" Product : references

@enduml
```

### Mô tả các lớp

| Lớp            | Mô tả                                                                         |
| -------------- | ----------------------------------------------------------------------------- |
| Product        | Lớp đại diện cho sản phẩm trong hệ thống, chứa thông tin chi tiết về sản phẩm |
| ProductVariant | Lớp đại diện cho các biến thể của sản phẩm (ví dụ: RAM 32GB, SSD 2TB)         |
| ProductSpecs   | Lớp chứa thông số kỹ thuật của sản phẩm                                       |
| Category       | Lớp đại diện cho danh mục sản phẩm                                            |
| News           | Lớp đại diện cho bài viết tin tức                                             |
| Promotion      | Lớp đại diện cho chương trình khuyến mãi                                      |
| Wishlist       | Lớp quản lý danh sách sản phẩm yêu thích của người dùng                       |

---

## 7. Mô hình thực thể liên kết (ERD)

### 7.1. Mô hình thực thể liên kết

```plantuml
@startuml ERD
skinparam linetype ortho
skinparam class {
    BackgroundColor LightYellow
    BorderColor Black
}

entity "CATEGORY" as category {
    *_id : ObjectId <<PK>>
    --
    name : String <<NOT NULL>>
    slug : String <<UNIQUE, NOT NULL>>
    image : String
    createdAt : Date <<AUTO>>
    updatedAt : Date <<AUTO>>
}

entity "PRODUCT" as product {
    *_id : ObjectId <<PK>>
    --
    slug : String <<UNIQUE, NOT NULL>>
    name : String <<NOT NULL>>
    price : Number <<NOT NULL>>
    originalPrice : Number <<NOT NULL>>
    rating : Number <<DEFAULT: 0>>
    reviewCount : Number <<DEFAULT: 0>>
    mainImage : String
    gallery : Array
    description : String
    category : String <<FK, NOT NULL, INDEX>>
    brand : String <<INDEX>>
    badge : String
    specs : Object
    variants : Array
    highlightFeatures : Array
    createdAt : Date <<AUTO>>
    updatedAt : Date <<AUTO>>
}

entity "PRODUCT_VARIANT" as variant {
    *_id : ObjectId <<PK>>
    --
    _id : ObjectId <<FK>>
    name : String
    priceAdjustment : Number
}

entity "NEWS" as news {
    *_id : ObjectId <<PK>>
    --
    slug : String <<UNIQUE, NOT NULL>>
    title : String <<NOT NULL>>
    excerpt : String <<NOT NULL>>
    content : String <<NOT NULL>>
    image : String
    author : String
    publishedAt : Date
    createdAt : Date <<AUTO>>
    updatedAt : Date <<AUTO>>
}

entity "PROMOTION" as promotion {
    *_id : ObjectId <<PK>>
    --
    slug : String <<UNIQUE, NOT NULL>>
    title : String <<NOT NULL>>
    description : String <<NOT NULL>>
    image : String
    discountPercent : Number
    discountText : String
    startDate : Date
    endDate : Date
    featured : Boolean <<DEFAULT: false>>
    terms : Array
    createdAt : Date <<AUTO>>
    updatedAt : Date <<AUTO>>
}

entity "WISHLIST_ITEM" as wishlist {
    *id : String <<PK>>
    --
    _id : ObjectId <<FK>>
    addedAt : Date
}

category ||--o{ product : "contains"
product ||--o{ variant : "has"
product ||--o{ wishlist : "referenced by"

@enduml
```

### 7.2. Mô tả chi tiết các thực thể

#### Bảng CATEGORY (Danh mục)

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc        | Mô tả                              |
| -------------- | ------------ | ---------------- | ---------------------------------- |
| \_id           | ObjectId     | Primary Key      | Mã định danh duy nhất của danh mục |
| name           | String       | Not Null         | Tên danh mục                       |
| slug           | String       | Unique, Not Null | Đường dẫn thân thiện URL           |
| image          | String       |                  | Đường dẫn hình ảnh danh mục        |
| createdAt      | Date         | Auto             | Thời điểm tạo                      |
| updatedAt      | Date         | Auto             | Thời điểm cập nhật                 |

#### Bảng PRODUCT (Sản phẩm)

| Tên thuộc tính    | Kiểu dữ liệu  | Ràng buộc                    | Mô tả                                      |
| ----------------- | ------------- | ---------------------------- | ------------------------------------------ |
| \_id              | ObjectId      | Primary Key                  | Mã định danh duy nhất của sản phẩm         |
| slug              | String        | Unique, Not Null             | Đường dẫn thân thiện URL                   |
| name              | String        | Not Null                     | Tên sản phẩm                               |
| price             | Number        | Not Null                     | Giá bán hiện tại                           |
| originalPrice     | Number        | Not Null                     | Giá gốc                                    |
| rating            | Number        | Default: 0                   | Điểm đánh giá trung bình                   |
| reviewCount       | Number        | Default: 0                   | Số lượng đánh giá                          |
| mainImage         | String        |                              | Hình ảnh chính                             |
| gallery           | Array[String] |                              | Danh sách hình ảnh phụ                     |
| description       | String        |                              | Mô tả sản phẩm                             |
| category          | String        | Foreign Key, Not Null, Index | Tên danh mục (tham chiếu CATEGORY.name)    |
| brand             | String        | Index                        | Thương hiệu                                |
| badge             | String        |                              | Nhãn hiển thị (Quà tặng HOT, Giá tốt, ...) |
| specs             | Object        |                              | Thông số kỹ thuật                          |
| variants          | Array[Object] |                              | Danh sách biến thể                         |
| highlightFeatures | Array[String] |                              | Tính năng nổi bật                          |
| createdAt         | Date          | Auto                         | Thời điểm tạo                              |
| updatedAt         | Date          | Auto                         | Thời điểm cập nhật                         |

#### Bảng PRODUCT_VARIANT (Biến thể sản phẩm)

| Tên thuộc tính  | Kiểu dữ liệu | Ràng buộc   | Mô tả                         |
| --------------- | ------------ | ----------- | ----------------------------- |
| \_id            | ObjectId     | Primary Key | Mã định danh duy nhất         |
| \_id (Product)  | ObjectId     | Foreign Key | Tham chiếu đến PRODUCT.\_id   |
| name            | String       |             | Tên biến thể                  |
| priceAdjustment | Number       |             | Điều chỉnh giá so với giá gốc |

#### Bảng NEWS (Tin tức)

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc        | Mô tả                    |
| -------------- | ------------ | ---------------- | ------------------------ |
| \_id           | ObjectId     | Primary Key      | Mã định danh duy nhất    |
| slug           | String       | Unique, Not Null | Đường dẫn thân thiện URL |
| title          | String       | Not Null         | Tiêu đề bài viết         |
| excerpt        | String       | Not Null         | Tóm tắt nội dung         |
| content        | String       | Not Null         | Nội dung chi tiết        |
| image          | String       |                  | Hình ảnh đại diện        |
| author         | String       |                  | Tác giả                  |
| publishedAt    | Date         |                  | Thời điểm đăng bài       |
| createdAt      | Date         | Auto             | Thời điểm tạo            |
| updatedAt      | Date         | Auto             | Thời điểm cập nhật       |

#### Bảng PROMOTION (Khuyến mãi)

| Tên thuộc tính  | Kiểu dữ liệu  | Ràng buộc        | Mô tả                    |
| --------------- | ------------- | ---------------- | ------------------------ |
| \_id            | ObjectId      | Primary Key      | Mã định danh duy nhất    |
| slug            | String        | Unique, Not Null | Đường dẫn thân thiện URL |
| title           | String        | Not Null         | Tiêu đề khuyến mãi       |
| description     | String        | Not Null         | Mô tả khuyến mãi         |
| image           | String        |                  | Hình ảnh banner          |
| discountPercent | Number        |                  | Phần trăm giảm giá       |
| discountText    | String        |                  | Mô tả giảm giá           |
| startDate       | Date          |                  | Ngày bắt đầu             |
| endDate         | Date          |                  | Ngày kết thúc            |
| featured        | Boolean       | Default: false   | Khuyến mãi nổi bật       |
| terms           | Array[String] |                  | Điều kiện và điều khoản  |
| createdAt       | Date          | Auto             | Thời điểm tạo            |
| updatedAt       | Date          | Auto             | Thời điểm cập nhật       |

#### Bảng WISHLIST_ITEM (Sản phẩm yêu thích)

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc   | Mô tả                        |
| -------------- | ------------ | ----------- | ---------------------------- |
| id             | String       | Primary Key | Mã định danh duy nhất        |
| \_id (Product) | ObjectId     | Foreign Key | Tham chiếu đến PRODUCT.\_id  |
| addedAt        | Date         |             | Thời điểm thêm vào yêu thích |

### 7.3. Mô tả các mối quan hệ

| Mối quan hệ               | Mô tả                                                                       | Loại |
| ------------------------- | --------------------------------------------------------------------------- | ---- |
| CATEGORY - PRODUCT        | Một danh mục có thể chứa nhiều sản phẩm, một sản phẩm thuộc về một danh mục | 1:N  |
| PRODUCT - PRODUCT_VARIANT | Một sản phẩm có thể có nhiều biến thể                                       | 1:N  |
| PRODUCT - WISHLIST_ITEM   | Một sản phẩm có thể được thêm vào nhiều danh sách yêu thích                 | 1:N  |

---

## 8. Kết luận

### 8.1. Tổng kết

Báo cáo đã trình bày đầy đủ các khía cạnh phân tích và thiết kế của hệ thống Website Thương mại điện tử bán thiết bị điện tử, bao gồm:

1. **Biểu đồ Use Case**: Xác định các chức năng chính của hệ thống và tương tác với người dùng
2. **Biểu đồ phân cấp chức năng**: Phân rã các chức năng từ tổng quát đến chi tiết
3. **Sơ đồ luồng dữ liệu**: Mô tả luồng thông tin trong hệ thống ở các mức độ chi tiết khác nhau
4. **Sơ đồ lớp**: Thể hiện cấu trúc các đối tượng và mối quan hệ
5. **Mô hình ERD**: Thiết kế cơ sở dữ liệu với các thực thể và quan hệ

### 8.2. Đặc điểm kỹ thuật

-   **Công nghệ frontend**: Next.js 14, React, TypeScript, Tailwind CSS
-   **Cơ sở dữ liệu**: MongoDB với Mongoose ODM
-   **Kiến trúc**: Server-Side Rendering (SSR) kết hợp Client-Side Rendering (CSR)
-   **API**: RESTful API với Next.js Route Handlers

### 8.3. Hướng phát triển

Hệ thống có thể được mở rộng với các chức năng sau:

-   Hệ thống đăng nhập và quản lý tài khoản người dùng
-   Giỏ hàng và thanh toán trực tuyến
-   Hệ thống đánh giá và nhận xét sản phẩm
-   Quản trị viên (Admin panel) để quản lý sản phẩm, đơn hàng
-   Tích hợp thanh toán điện tử
-   Thông báo và email marketing

---

**Ngày lập báo cáo**: 08/12/2024

**Người thực hiện**: Nhóm phát triển hệ thống

---

_Báo cáo này được xây dựng dựa trên phân tích mã nguồn thực tế của hệ thống Website Thương mại điện tử._
