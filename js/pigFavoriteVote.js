const { createApp } = Vue;

createApp({
    data() {
        return {
            voteResults: this.getStoredVoteResults(), // 从 localStorage 获取投票结果
            showVoteModal: false, // 控制投票选项弹窗显示
            currentVoteOption: '' , // 当前投票选项
            showDislikeMessage: false,
            characters: {
                '牛牛': { approve: 0, disapprove: 0, imageUrl: 'assets/牛牛.jpg' },
                '蛋蛋🥚': { approve: 0, disapprove: 0, imageUrl: 'assets/蛋蛋.gif' },
                '肥肥': { approve: 20, disapprove: 10, imageUrl: 'assets/pig-tingduf.gif' },
                '猪猪': { approve: 15, disapprove: 8, imageUrl: 'assets/pig-sing.gif' }
            },
        };
    },
    methods: {
        // 获取存储的投票结果（如果没有则使用默认值）
        getStoredVoteResults() {
            const storedResults = localStorage.getItem('voteResults');
            if (storedResults) {
                return JSON.parse(storedResults); // 如果有存储的数据，则使用它
            }
            // 如果没有存储的数据，则使用默认值
            return {
                '牛牛': { approve: 0, disapprove: 0 },
                '蛋蛋🥚': { approve: 0, disapprove: 0 },
                '肥肥': { approve: 20, disapprove: 0 },
                '猪猪': { approve: 10, disapprove: 0 }
            };
        },

        // 打开投票选项弹窗
        openVoteModal(option) {
            this.currentVoteOption = option;
            this.showVoteModal = true;
        },

        // 关闭投票选项弹窗
        closeVoteModal() {
            this.showVoteModal = false;
        },

        // 处理投票
        castVote(voteType) {
            if (voteType === 'approve') {
                this.voteResults[this.currentVoteOption].approve += 1;
            } else {
                if (this.currentVoteOption === '猪猪') {
                    // 猪猪不能被反对，显示提示框并保持反对票数不变
                    this.showDislikeMessage = true;
                } else {
                    // 对其他角色正常处理
                    this.voteResults[this.currentVoteOption].disapprove += 1;
                }
            }

            // 将更新后的投票结果保存到 localStorage
            localStorage.setItem('voteResults', JSON.stringify(this.voteResults));

            this.closeVoteModal(); // 关闭弹窗

            setTimeout(() => {
                this.showDislikeMessage = false;
            }, 3000); // 3秒后自动关闭提示框
        },



        resetVoteResults() {
            this.voteResults = {
                '牛牛': { approve: 0, disapprove: 0 },
                '蛋蛋🥚': { approve: 0, disapprove: 0 },
                '肥肥': { approve: 20, disapprove: 0 },
                '猪猪': { approve: 10, disapprove: 0 }
            };
            // 清除 localStorage 中的投票结果
            localStorage.removeItem('voteResults');
        }


    }
}).mount('#app');
