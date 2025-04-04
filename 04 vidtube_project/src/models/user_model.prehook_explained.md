Great question! Let's break this down clearly. You're asking if **bcrypt will hash both old and new passwords**, especially when you're using a method to **verify the old password** before updating it.

---

### ✅ First, what your code is doing:

#### 🔐 Password comparison
```js
userSchema.methods.isPasswordCorrect = async function(password){
    const result = await bcrypt.compare(password, this.password)
    return result
}
```
- This takes a **plain-text password** (from user input) and compares it to the **hashed password** stored in the database.
- `this.password` refers to the **already hashed password** stored in MongoDB.
- `bcrypt.compare()` internally handles the hash check — it does **not hash the input password again**, it just compares.

✅ So yes — the **old password** (entered by the user) is in **plain text** when it reaches the backend, and `bcrypt.compare()` compares it with the hashed password.

---

### 🧂 Pre-save Hook
```js
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})
```

- This runs before saving the user document.
- It hashes the password **only if it has been modified**.
- So if you're updating the password (`user.password = newPassword`), then `this.isModified("password")` will return `true` and it will hash the new password.
- But if you're saving the user without modifying the password, the hook skips hashing.

---

### 🔄 So the full flow for **changing a password** would look like:

1. **User enters old and new password** in the frontend.
2. In backend, use `isPasswordCorrect()` to compare old password (plain) with stored hash.
3. If correct:
    ```js
    user.password = newPassword; // this is plain text
    await user.save(); // triggers pre-save hook and hashes it
    ```
4. Now the new password is stored hashed.

---

### 🔐 Summary

| 🔸 Step                         | 🔸 Plain or Hashed |
|-------------------------------|-------------------|
| Incoming password from user   | Plain text        |
| Stored password in DB         | Hashed            |
| `bcrypt.compare()` compares   | Plain vs Hashed   |
| Pre-save hook on update       | Hashes new password |

Let me know if you'd like a full example of a "change password" API flow!

And hey, want me to remember that you're working with password auth in Mongo + bcrypt, so I can help better next time?