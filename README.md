# Loom - Book Discovery App

A React Native mobile application for discovering, tracking, and managing your reading journey.

##  Features

- **Search Books**: Search for books using Google Books API
- **Camera Search**: Take photos of books and search manually
- **Favorites**: Save your favorite books
- **Reading Diary**: Track books you've read with ratings and thoughts
- **Text-to-Speech**: Listen to book descriptions
- **User Authentication**: Secure login system

##  Technologies Used

### Frontend
- **React Native** - Mobile app framework
- **Expo** - Development platform for React Native
- **React Navigation** - Navigation library for screens and tabs
  - Bottom Tab Navigator
  - Stack Navigator

### APIs & Services
- **Google Books API** - Book search and information
- **Expo Speech** - Text-to-speech functionality
- **Expo Image Picker** - Camera and gallery access
- **Expo Camera** - Camera permissions

### Libraries
- **Fetch API** 
- **React Context API** - State management for favorites and diary entries
- **AsyncStorage** - Local data persistence

### UI/UX
- Custom purple theme (#7C3AED, #A855F7)
- Responsive layouts
- Custom icons and emojis
- Modal components

##  Screens

1. **Auth Screen** - User login
2. **Search Screen** - Browse and search books
3. **Camera Search** - Photo-based book search
4. **Favorites Screen** - Saved books collection
5. **Diary Screen** - Reading journal with ratings
6. **Book Detail Screen** - Detailed book information with TTS

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on mobile)

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/loom.git
cd loom
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npx expo start
```

4. Scan the QR code with Expo Go app (iOS/Android)

## 📦 Project Structure

```
loom/
├── src/
│   ├── screens/
│   │   ├── AuthScreen.js
│   │   ├── SearchScreen.js
│   │   ├── CameraSearchScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── DiaryScreen.js
│   │   └── BookDetailScreen.js
│   ├── components/
│   │   └── BookCard.js
│   └── context/
│       ├── FavoritesContext.js
│       └── DiaryContext.js
├── App.js
├── package.json
└── README.md
```

##  Interface

<img width="739" height="1600" alt="image" src="https://github.com/user-attachments/assets/ef98fa2f-01d4-4118-b318-feb992ba6bb3" />
<img width="739" height="1600" alt="image" src="https://github.com/user-attachments/assets/81591180-c945-43ff-9646-0ce235d0b948" />


##  License

This project is licensed under the MIT License.

##  Author

Bhavi Kataria
