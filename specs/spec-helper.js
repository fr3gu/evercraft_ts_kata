global.makeLevel = (hero, level) => {
    hero.addXp((level - 1) * 1000);
};