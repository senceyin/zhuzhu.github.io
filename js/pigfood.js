const { createApp } = Vue;

createApp({
    data() {
        return {
            // 假设的食谱数据
            recipes: [
                {
                    id: 1,
                    name: "猪猪炒饭",
                    date: "2025-01-10",
                    photo: "assets/recipes/pigfriedrice.jpg",
                    ingredients: ["米饭", "鸡蛋", "胡椒", "青菜"],
                    year: 2025,
                    month: 1,
                },
                {
                    id: 2,
                    name: "猪猪蛋炒饭",
                    date: "2025-02-20",
                    photo: "assets/recipes/pigeggfriedrice.jpg",
                    ingredients: ["米饭", "鸡蛋", "香肠", "酱油"],
                    year: 2025,
                    month: 2,
                },
                {
                    id: 3,
                    name: "猪猪火锅",
                    date: "2025-03-15",
                    photo: "assets/recipes/pighotpot.jpg",
                    ingredients: ["火锅底料", "牛肉", "羊肉", "蔬菜"],
                    year: 2025,
                    month: 3,
                },
                {
                    id: 4,
                    name: "猪猪火锅",
                    date: "2025-03-15",
                    photo: "assets/recipes/pighotpot.jpg",
                    ingredients: ["火锅底料", "牛肉", "羊肉", "蔬菜"],
                    year: 2024,
                    month: 3,
                },
                {
                    id: 5,
                    name: "猪猪火锅",
                    date: "2025-03-15",
                    photo: "assets/recipes/pighotpot.jpg",
                    ingredients: ["火锅底料", "牛肉", "羊肉", "蔬菜"],
                    year: 2025,
                    month: 3,
                },
                {
                    id: 6,
                    name: "猪猪火锅",
                    date: "2025-03-15",
                    photo: "assets/recipes/pighotpot.jpg",
                    ingredients: ["火锅底料", "牛肉", "羊肉", "蔬菜"],
                    year: 2025,
                    month: 3,
                },
                // 添加更多食谱数据
            ],
            selectedYear: null,
            selectedMonth: null,
        };
    },
    computed: {
        // 提取所有年份
        years() {
            return [...new Set(this.recipes.map(recipe => recipe.year))]; // 获取不重复的年份
        },
        // 提取所有月份
        months() {
            return [...new Set(this.recipes.map(recipe => recipe.month))]; // 获取不重复的月份
        },
        // 根据选择的年份和月份来筛选食谱
        filteredRecipes() {
            return this.recipes.filter(recipe => {
                return (
                    (!this.selectedYear || recipe.year === this.selectedYear) &&
                    (!this.selectedMonth || recipe.month === this.selectedMonth)
                );
            });
        }
    },
    methods: {
        // 选择年份
        selectYear(year) {
            this.selectedYear = year;
            this.selectedMonth = null; // 清空月份选择
        },
        // 选择月份
        selectMonth(month) {
            this.selectedMonth = month;
        },
    }
}).mount("#app");
