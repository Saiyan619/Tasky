import React, { useState } from 'react';

const Collaborators = () => {
    // Generate dummy users for testing
    const generateDummyUsers = () =>
        Array.from({ length: 50 }, (_, index) => ({
            clerkId: `user_${index + 1}`,
            name: `User ${index + 1}`,
        }));

    const [users] = useState(generateDummyUsers());
    const [collaborators, setCollaborators] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle adding/removing collaborators
    const toggleCollaborator = (user) => {
        setCollaborators((prev) => {
            const isSelected = prev.find((c) => c.clerkId === user.clerkId);
            if (isSelected) {
                return prev.filter((c) => c.clerkId !== user.clerkId);
            } else {
                return [...prev, { ...user, role: 'viewer' }]; // Default role
            }
        });
    };

    // Handle role change
    const updateRole = (clerkId, role) => {
        setCollaborators((prev) =>
            prev.map((c) => (c.clerkId === clerkId ? { ...c, role } : c))
        );
    };

    // Filter users based on the search query
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle submit action
    const handleSubmit = () => {
        console.log('Selected Collaborators:', collaborators);
    };

    return (
        <div>
            <h2>Create Task - Add Collaborators</h2>

            {/* Searchable User List */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Search Users</h3>
                <input
                    type="text"
                    placeholder="Search users by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '8px',
                        width: '100%',
                        maxWidth: '300px',
                        marginBottom: '10px',
                    }}
                />
                <div
                    style={{
                        maxHeight: '200px',
                        overflowY: 'scroll',
                        border: '1px solid #ccc',
                        padding: '10px',
                    }}
                >
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div
                                key={user.clerkId}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    onChange={() => toggleCollaborator(user)}
                                    checked={collaborators.some(
                                        (c) => c.clerkId === user.clerkId
                                    )}
                                />
                                <span style={{ marginLeft: '10px' }}>{user.name}</span>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>

            {/* List of selected collaborators */}
            <h3>Selected Collaborators</h3>
            {collaborators.length > 0 ? (
                collaborators.map((collab) => (
                    <div
                        key={collab.clerkId}
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                    >
                        <span>{collab.name}</span>
                        <select
                            style={{ marginLeft: '10px' }}
                            value={collab.role}
                            onChange={(e) => updateRole(collab.clerkId, e.target.value)}
                        >
                            <option value="owner">Owner</option>
                            <option value="collaborator">Collaborator</option>
                            <option value="viewer">Viewer</option>
                        </select>
                    </div>
                ))
            ) : (
                <p>No collaborators selected.</p>
            )}

            <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Submit
            </button>
        </div>
    );
};

export default Collaborators;
