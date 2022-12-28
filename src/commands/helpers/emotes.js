export function findClassEmote(soulClass) {
    return ClassesWithText.get(soulClass);
}

export function findClassEmoteObject(soulClass) {
    return ClassesWithObject.get(soulClass);
}

const ClassesWithText = new Map([
    ['Berserker', '<:berserker:1039914842183696444>'],
    ['Alchemist', '<:alchemist:1039914840917037066>'],
    ['Ranger', '<:ranger:1039914843861430272>']
]);

const ClassesWithObject = new Map([
    ['Berserker', {
        name: "berserker",
        id: "1039914842183696444"
    }],
    ['Alchemist', {
        name: "alchemist",
        id: "1039914840917037066"
    }],
    ['Ranger', {
        name: "ranger",
        id: "1039914843861430272"
    }]
]);
