const interactionMap = new Map();

export function newInteractionEntry(messageId, metadata) {
    interactionMap.set(messageId, {info: metadata});
}
export function getInteractionEntry(messageId) {
    return interactionMap.get(messageId).info;
}

export function deleteInteractionEntry(messageId) {
    return interactionMap.delete(messageId);
}