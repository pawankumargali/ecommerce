## Request Routes
||||||||||||||||
HTTP Verbs|/auth|||/user|/category|||/categories|/product||||/products|||
:---: |:---: |:---: |:---: |:---: |:---: |:---: |:---: |/:---: |:---: |:---: |:---: |:---: |:---: |:---: |:---: |
|1|||2|3|||4|5||||6|||
|/signup|/signin|/signout|/:userId|/create/:userId|/:categoryId|/:categoryId/:userId|/|/create/:userId|/:productId|/:productId/:userId|/image/:productId|/|/related/:productId|/categories|/by/search
GET|-|-|sign user out|Read user profile with respective userId|-|Read category with respective categoryId|-|Read list of all categories|Add new product|Read product with respective productId|-|Fetch image of product with respective productId|Read all products|Read products related to given product with respective productId|Read all product categories|Read products based on search criteria (price range and specific categories)
POST|"Post name| email and password to register new user"|"Post email| password to sign in registered user"|-|-|Create new category|-|-|-|-|-|-|-|-|-|-|-
PUT|-|-|-|-|-|-|Update existing category with respective categoryId |-|-|-|Update info of existing product with respective productId|-|-|-|-|-
DELETE|-|-|-|-|-|-|Delete existing category with respective categoryId |-|-|-|Remove existing product with respective productId|-|-|-|-|-
USER ACCESS|NR|NR|AUTH|NR|ADMIN|NR|ADMIN|NR|ADMIN|NR|ADMIN|NR|NR|NR|NR|NR
||||||||||||||||
||||||||||||||||
||||||USER ACCESS||||||||||
||||||NR|Not Restricted|||||||||
||||||AUTH|Authenticated User|||||||||
||||||ADMIN|Admin User only|||||||||


