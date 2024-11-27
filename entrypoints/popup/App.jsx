import './App.css';

function App() {
    return (
        <div className="popup-container">
            <h1>FollowFlow</h1>
            <p>Welcome to FollowFlow, your assistant for automating profile interactions on social platforms!</p>

            <h2>Features:</h2>
            <ul>
                <li>Automatically hover over profile avatars to trigger popups.</li>
                <li>Interact with profiles, such as following users, with ease.</li>
                <li>Efficient filtering for visible profiles in the feed.</li>
            </ul>

            <p className="tip">
                Navigate to the desired feed and let the extension do its magic. Happy automating!
            </p>

            <footer className="footer">
                <p>Developed with ❤️ by Saleh Khatri</p>
            </footer>
        </div>
    );
}

export default App;
