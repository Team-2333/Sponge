import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, "code")))

import main
import account, post, message
import random

'''
Add fake data to database for testing and demo

This script should only be executed once after reseting database
'''

users = []
sellerPosts = []
buyerPosts = []

reviews = []
messages = []

users.append({"username": "MaxWilson", "email": "mw2333@sponge.com", "password": "1234", "zipcode":" 10001"})
users.append({"username": "IreneNash", "email": "in2333@sponge.com", "password": "1234", "zipcode":" 10002"})
users.append({"username": "CarlLyman", "email": "cl2333@sponge.com", "password": "1234", "zipcode":" 10003"})
users.append({"username": "Jessica", "email": "jessica@sponge.com", "password": "1234", "zipcode":" 10025"})
users.append({"username": "Johnson", "email": "johnson@sponge.com", "password": "1234", "zipcode":" 10025"})
users.append({"username": "system", "email": "system@sponge.com", "password": "1234", "zipcode":" 10000"})

sellerPosts.append({"title": "A brand new handbag", "category":"Beauty", "price":800, "location": "New York", "image": "bag.jpg", "description": "I just bought a handbag. But its color is different from what I expected. So I want to sell it to someone else. This bag is brand new and never used outside. its original price is $1000. I can give a discount. PM me if you want:)"})
sellerPosts.append({"title": "Macbook pro 15 inch 2016", "category": "Electronics", "price" : 666, "location": "Washington", "image": "mbp.jpg", "description": "This mbp has been used for two years but still in good condition. Not a good choice for gaming but enough for browsing websites and writing documents. Prefer local transaction. Online transaction is acceptable only if the buyer has good credit history."})
sellerPosts.append({"title": "Yamaha digial piano", "category": "Music", "price" : 750, "location": "Arizona", "image": "piano.jpg", "description": "I bought this piano 4 years ago, and I am considering to buy a grand piano. Though this piano has used for 4 years, it still in good condition. The official price is $1500."})
sellerPosts.append({"title": "Ducal Chest of Drawer", "category": "Furniture", "price" : 99, "location": "Texas", "image": "drawer.jpg", "description": "I am about to leave this city, and the drawer is not easy to move. The drawer has been used for 3 years, but still in good condition. The price is negotiable because I prefer buyer come and pick it up. Please let me know if you are interested."})
sellerPosts.append({"title": "Air conditioner", "category": "Furniture", "price" : 139, "location": "Texas", "image": "air.jpg", "description": "I am about to leave this city and want to sell this air conditioner. It has been used for 1 years, but still in good condition. I clean it every month, so you don't need to worry about cleanliness.Please let me know if you are interested."})
sellerPosts.append({"title": "Drone", "category": "Electronics", "price" : 500, "location": "Texas", "image": "dji.jpg", "description": "I buy the dji drone for my son. However, it seems like that he is not old enough to play it. The drone is in well condition. It can continuous fly for nearly 4 hour. Prefer face to face."})
sellerPosts.append({"title": "Camera", "category": "Electronics", "price" : 200, "location": "Ohio", "image": "camera.jpg", "description": "A well preserved camera which has been used for 2 years. The brand is XXX."})
sellerPosts.append({"title": "Mouse", "category": "Electronics", "price" : 30, "location": "Maine", "image": "mouse.jpg", "description": "A really sensitive mouse which is suitable for palying games. Prefer to deal face to face."})

sellerPosts.append({"title":"A beagle puppy", "category":"Outdoor", "price":1, "location":"Massachusetts", "image":"beagle.jpg", "description":"Hi I'm gonna work overseas and cannot take care of him any more. Please adopt this puppy!"})
sellerPosts.append({"title":"PS4 White", "category":"Electronics", "price":210, "location":"Massachusetts", "image":"ps4.jpg", "description":"PS4 White 500GB. Used for less than 1 year. I can give you some games for free if you choose face-to-face transaction."})
sellerPosts.append({"title":"Laptop bag", "category":"Accessories", "price":15, "location":"Massachusetts", "image":"anello.jpg", "description":"I bought this anello bag at the price of $30. I don't like its color. It's a great bag and fits 15'' laptop."})
sellerPosts.append({"title":"Girls' sneakers", "category":"Clothing", "price":30, "location":"Massachusetts", "image":"sneakers.jpg", "description":"I bought the sneakers for my daughter. She grows too fast and cannot fit in these size 4 shoes. So they are brand new."})
sellerPosts.append({"title":"Fish photobook", "category":"Books", "price":60, "location":"Massachusetts", "image":"fishbook.jpg", "description":"A good fish photobook for students. Original price is $98."})
sellerPosts.append({"title": "Dining Table with 6 chairs", "category": "Furniture", "price" : 200, "location": "South Dakota", "image": "diningtable.jpg", "description": "I plan to update the furniture. So I want to sell a dining table and 6 chairs. I bought this 6 years ago, but all are kept in good condition. Please let me know if you are interested."})


buyerPosts.append({"title": "Need a cheap ipad air", "category": "Electronics", "price": 100, "location": "California", "image": "ipad.jpg", "description": "I need a used ipad for studying. I don't want to bring laptop to school every day cuz it's too heavy. It's ok if your ipad is not in good condition as long as it can function well. PM me for detail if you are interested."})
buyerPosts.append({"title": "Want a mountain bike", "category": "Outdoor", "price": 250, "location": "New Jersey", "image": "bike.jpg", "description": "My previous mountain bike has some unfixable damage, such that I want to buy a new mountain bike. I don't need a really new bike, but please make sure your bike is safe to ride. Your bike should be the same style as the image attached."})
buyerPosts.append({"title": "Want a limited edition shoes", "category": "Clothing", "price": 1000, "location": "Iowa", "image": "shoes.jpg", "description": "I forgot the date of release. And when I remember, it is out of stock in all the stores. If anyone has this shoes, I would like to provide a competitive price."})
buyerPosts.append({"title": "Want a second-hand book", "category": "Books", "price": 10, "location": "New York", "image": "book.jpg", "description": "A course I recently take asks me to buy a book about spark. I prefer the book in better condition without any draft on it. BTW, prefer to deal face to face."})
buyerPosts.append({"title": "Want a second-hand GPU", "category": "Electronics","image":"gpu.jpg", "price": 1000, "location": "New York", "description": "I want a XXX' GPU to play games. It will be better if it has been used less than 1 year."})
buyerPosts.append({"title": "Need a comfortable sofa", "category": "Furniture", "price": 80,"image":"sofa.jpg",  "location": "Florida", "description": "I will move the Florida next month, and I need a sofa in my new place. Please make sure your second-hand sofa is in good condition and I prefer the seller who can ship the sofa to my place."})
buyerPosts.append({"title": "Need a Tennis Racquet", "category": "Outdoor", "price": 30,"image":"tennis.jpg",  "location": "Kansas", "description": "I start to play tennis recently, and I need a defender tennis racquet. I don't have specific brand requirement, but make sure the tennis is in good condition. The price is negotiable"})

with main.app.app_context():
    # add users
    for user in users:
        if user['username'] == 'system':
            users.remove(user)
        account.registerUser(user["username"], user["email"], user["password"], user["zipcode"])
        message.sendMessage(receiver=user["username"], content="Hello, "+user["username"] + ". Welcome to sponge!")

    # add posts
    for item in sellerPosts:
        image = open(os.path.join("image", item["image"]), "r")
        post.createPost(item["title"], item["description"], item["category"], item["price"], item["location"], image.read(), random.choice(users)["username"], "Seller")
        image.close()
    for item in buyerPosts:
        image = open(os.path.join("image", item["image"]), "r")
        post.createPost(item["title"], item["description"], item["category"], item["price"], item["location"], image.read(), random.choice(users)["username"], "Buyer")
        image.close()
