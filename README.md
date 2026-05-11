# TaskFlow - Task Management System
 
## 📌 Description
 
TaskFlow is a simple task management system designed to help users organize and manage their daily tasks efficiently. The system allows users to create, view, update, delete, and mark tasks as completed through an intuitive interface. It also includes an admin panel for managing users and system data. TaskFlow aims to improve productivity by providing a structured and easy-to-use task tracking experience.
 
## ✨ Features

### 👤 Authentication & Security

- Secure user registration and login
- Password update functionality
- Session-based authentication
### 📋 Task Management System
- Full CRUD operations for tasks
- Mark tasks as completed or pending
- Search and filtering capabilities
### 📊 Dashboard Analytics
- Overview of pending vs completed tasks
- Quick productivity snapshot per user
### 🛡️ Admin Control Panel
- Manage users (Create, Read, Update, Delete)
- Role-based access control
### 🎨 User Experience
- Dark / Light mode toggle
- Responsive UI design
- Clean and minimal interface

## 🔐 Default Admin Access for testing

1. **Open terminal and use the command:**
    ```
    php artisan tinker
    ```
2. **Copy and paste this:**
    ```
    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    
    User::create([
        'name' => 'Admin',
        'email' => 'admin@example.com',
        'password' => Hash::make('password'),
        'role' => 'admin',
    ]);
    ```
1. **Credentials**
    ```
    Email: admin@example.com
    Password: password
    ```

## 📸 UI Previews

![Alt Text](/assets/images/1.png)

![Alt Text](/assets/images/2.png)

![Alt Text](/assets/images/3.png)

![Alt Text](/assets/images/4.png)

![Alt Text](/assets/images/5.png)

![Alt Text](/assets/images/6.png)

![Alt Text](/assets/images/7.png)
