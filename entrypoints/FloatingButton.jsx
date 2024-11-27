import React, {useState} from "react";

// Floating button component (Self explanatory ig but the assignment said to comment the code xd)
function FloatingButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    // Function to check if the profile is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }

    // Function to handle hover and click action on the follow button
    async function hoverAndFollow(profile, index) {
        if (isCancelled) return; // Return if request is cancelled
        // Simulate hover (mouseenter)
        profile.dispatchEvent(new Event('mouseover', { bubbles: true }));
        console.log(`Hovered over profile ${index + 1}`);

        // Wait for popup to appear and click follow button
        const followButton = await waitForFollowButton(1500);
        if (followButton) {
            followButton.click();
            console.log(`Clicked "Follow" button for profile ${index + 1}`);
        }

        // Simulate hover end (mouseout)
        profile.dispatchEvent(new Event('mouseout', { bubbles: true }));
    }

    // Function to wait for the follow button to appear within the modal
    function waitForFollowButton(delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                const followButton = document.querySelector('[aria-label^="Follow "]');
                resolve(followButton);
            }, delay);
        });
    }


    const handleOnClick = async () => {

        setIsLoading(true); // Start loading

        // Get all buttons with anchortag '/home' as for-you have same
        const buttons = document.querySelectorAll('a[href="/home"]');

        // Getting button by innertext as the id and class name are dynamic (it's the best approach i thought that time)
        const forYouButton = Array.from(buttons).find(button =>
            button.innerText.trim() === "For you"
        );

        if(!forYouButton){
            return console.log("For You button not found!");
        }

        // Click For You only if it's not already active
        if(forYouButton.getAttribute('aria-selected') === 'false'){
            forYouButton.click()
            await new Promise(resolve => setTimeout(resolve, 2000));

        }

            // With the inspect tool found that all avatar have anchor tag with role="link" and aria-hidden="true" it's unchanged for all profiles
        const profiles = document.querySelectorAll('a[role="link"][aria-hidden="true"]');

            // Filter only profiles that are in viewport
        const visibleProfiles = Array.from(profiles).filter(isInViewport);


            // Hover and press follow on each visible profiles one by one
        for (let [index, profile] of visibleProfiles.entries()) {
            await hoverAndFollow(profile, index);
            // Delay between each hover of 2.0s (tried 1.5s but x.com detects it as malicious or maybe i did to many test that's why haha)
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        setIsLoading(false);

    }

    return (
        <div
            id="floating-button-container"
            style={{
                position: 'fixed',
                top: '6px',
                right: '18px',
                zIndex: 1000,
            }}
        >

            <button
                style={{
                    fontFamily: "'Inter', sans-serif",
                    padding: '8px 12px',
                    backgroundColor: isLoading ? '#555555' : '#131413', // Gray when disabled
                    color: isLoading ? '#AAAAAA' : '#39FF14', // Light gray for text when disabled
                    border: `2px solid ${isLoading ? '#555555' : '#39FF14'}`, // Gray border when disabled
                    borderRadius: '20px',
                    cursor: isLoading ? 'not-allowed' : 'pointer', // No pointer for disabled button
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: isLoading ? 'none' : '0 0 6px #53bc4a, 0 0 6px #39FF14', // Remove shadow when disabled
                    opacity: isLoading ? 0.6 : 1, // Reduce opacity for a subtle effect
                }}
                onMouseOver={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.backgroundColor = '#39FF14';
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.boxShadow = '0 0 12px #53bc4a, 0 0 24px #39FF14';
                    }
                }}
                onMouseOut={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.backgroundColor = '#131413';
                        e.currentTarget.style.color = '#39FF14';
                        e.currentTarget.style.boxShadow = '0 0 6px #53bc4a, 0 0 6px #39FF14';
                    }
                }}
                onClick={handleOnClick}
                disabled={isLoading}
            >                {isLoading ? "Loading..." : "Follow All"}
            </button>

        </div>
    );
}

export default FloatingButton;
