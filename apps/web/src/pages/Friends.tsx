import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Friends.css";

export default function Friends() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"friends" | "requests" | "search">("friends");

  // Mock data - will be replaced with Firebase data
  const friends = [
    { id: 1, username: "alex_workout", email: "alex@example.com", mutualFriends: 3 },
    { id: 2, username: "sarah_codes", email: "sarah@example.com", mutualFriends: 5 },
    { id: 3, username: "mike_runner", email: "mike@example.com", mutualFriends: 2 },
  ];

  const friendRequests = [
    { id: 1, username: "john_lifts", email: "john@example.com", mutualFriends: 1, timestamp: "2 hours ago" },
    { id: 2, username: "emma_reads", email: "emma@example.com", mutualFriends: 4, timestamp: "1 day ago" },
  ];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Search Firebase for users by username
    console.log("Searching for:", searchQuery);
    // Mock search results
    if (searchQuery.trim()) {
      setSearchResults([
        { id: 4, username: "test_user123", email: "test@example.com", isFriend: false },
        { id: 5, username: "another_user", email: "another@example.com", isFriend: false },
      ]);
    }
  };

  const handleAddFriend = (userId: number) => {
    // TODO: Send friend request in Firebase
    console.log("Sending friend request to user:", userId);
  };

  const handleAcceptRequest = (userId: number) => {
    // TODO: Accept friend request in Firebase
    console.log("Accepting friend request from user:", userId);
  };

  const handleRejectRequest = (userId: number) => {
    // TODO: Reject friend request in Firebase
    console.log("Rejecting friend request from user:", userId);
  };

  const handleRemoveFriend = (userId: number) => {
    // TODO: Remove friend in Firebase
    console.log("Removing friend:", userId);
  };

  return (
    <div className="friends-container">
      <div className="friends-background">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
      </div>

      <div className="friends-content">
        <button className="back-button" onClick={() => navigate("/app")}>
          ← Back to Dashboard
        </button>

        <div className="friends-header">
          <h1 className="friends-title">Friends</h1>
          <p className="friends-subtitle">Connect with friends and compete together</p>
        </div>

        <div className="friends-tabs">
          <button
            className={`tab-btn ${activeTab === "friends" ? "active" : ""}`}
            onClick={() => setActiveTab("friends")}
          >
            My Friends ({friends.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Requests ({friendRequests.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "search" ? "active" : ""}`}
            onClick={() => setActiveTab("search")}
          >
            Add Friends
          </button>
        </div>

        <div className="friends-body">
          {activeTab === "search" && (
            <div className="search-section">
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
              </form>

              {searchResults.length > 0 && (
                <div className="results-list">
                  <h3 className="results-title">Search Results</h3>
                  {searchResults.map((user) => (
                    <div key={user.id} className="user-card">
                      <div className="user-avatar">{user.username[0].toUpperCase()}</div>
                      <div className="user-info">
                        <div className="user-name">{user.username}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                      <button
                        className="add-friend-btn"
                        onClick={() => handleAddFriend(user.id)}
                      >
                        Add Friend
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="no-results">
                  <p>No users found with username "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "friends" && (
            <div className="friends-list">
              {friends.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">👥</div>
                  <h3>No friends yet</h3>
                  <p>Search for friends to start competing!</p>
                  <button className="cta-btn" onClick={() => setActiveTab("search")}>
                    Add Friends
                  </button>
                </div>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className="user-card">
                    <div className="user-avatar">{friend.username[0].toUpperCase()}</div>
                    <div className="user-info">
                      <div className="user-name">{friend.username}</div>
                      <div className="user-email">{friend.email}</div>
                      <div className="user-meta">{friend.mutualFriends} mutual friends</div>
                    </div>
                    <button
                      className="remove-friend-btn"
                      onClick={() => handleRemoveFriend(friend.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "requests" && (
            <div className="requests-list">
              {friendRequests.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📬</div>
                  <h3>No pending requests</h3>
                  <p>Friend requests will appear here</p>
                </div>
              ) : (
                friendRequests.map((request) => (
                  <div key={request.id} className="user-card request-card">
                    <div className="user-avatar">{request.username[0].toUpperCase()}</div>
                    <div className="user-info">
                      <div className="user-name">{request.username}</div>
                      <div className="user-email">{request.email}</div>
                      <div className="user-meta">
                        {request.mutualFriends} mutual friends · {request.timestamp}
                      </div>
                    </div>
                    <div className="request-actions">
                      <button
                        className="accept-btn"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
