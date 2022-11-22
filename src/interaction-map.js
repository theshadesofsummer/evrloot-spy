const interactionMap = new Map();

export function newInteractionEntry(messageId, metadata) {
    interactionMap.set(messageId, {page: 0, info: metadata});
}

export function getInteractionEntryRight(messageId) {
    const interactionEntry = interactionMap.get(messageId)
    interactionEntry.page++;
    return interactionEntry;
}

export function getInteractionEntryLeft(messageId) {
    const interactionEntry = interactionMap.get(messageId)
    interactionEntry.page--;
    return interactionEntry;
}

export function deleteInteractionEntry(messageId) {
    return interactionMap.delete(messageId);
}