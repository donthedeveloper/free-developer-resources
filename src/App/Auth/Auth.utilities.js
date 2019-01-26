export const isAdmin = (permissions, uid) => {
    if (!permissions || !uid) {
        return false
    }
    return permissions.some((permission) => permission[uid] === 'admin');
};