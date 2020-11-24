<template>
    <div class="private">
        <header>
            Olá {{ user.name }}!

            <el-button
                size="small"
                round
                @click="logout">
                Logout
            </el-button>
        </header>

        <main>
            <aside>
                <el-menu
                    v-loading="!user"
                    :default-active="activePath"
                    :default-openeds="[activePathGroup]"
                    router>
                    <component
                        :is="entry.isGroup ? 'el-submenu' : 'el-menu-item'"
                        v-for="(entry, index) in filteredMenuEntries"
                        :key="index"
                        :index="entry.path">
                        <template
                            v-if="entry.isGroup"
                            class="isGroup">
                            <template
                                slot="title">
                                <i class="material-icons">{{ entry.icon }}</i>
                                <span>{{ entry.label }}</span>
                            </template>
                            <el-menu-item
                                v-for="(child, subindex) in entry.children"
                                :key="`${index}-${subindex}`"
                                :index="child.path">
                                <i class="material-icons">{{ child.icon }}</i>
                                <span>{{ child.label }}</span>
                            </el-menu-item>
                        </template>
                        <template v-else>
                            <i class="material-icons">{{ entry.icon }}</i>
                            <span>{{ entry.label }}</span>
                        </template>
                    </component>
                </el-menu>
            </aside>
            <section>
                <div ref="view">
                    <router-view />
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '@/store/types';
import { menuEntries } from "@/router";

export default {
    data() {
        return {
            menuEntries,
            activePath: null,
            activePathGroup: null
        };
    },
    computed: {
        filteredMenuEntries() {
            if (!this.user) return [];
            const filteredMenuEntries = this.menuEntries.filter(it => {
                it
                return true;
            });
            return filteredMenuEntries;
        },
        ...mapGetters({
            user: types.AUTH_USER,
        })
    },
    mounted() {
        this.getUser()
    },
    updated() {
        this.$nextTick(() => {
            this.$refs.view.scrollTop = 0;
        })
    },
    methods: {
        async getUser() {
            try {
                await this.$store.dispatch(types.AUTH_VERIFY);
            } catch {
                this.$router.push({ path: '/' })
            }
        },
        async logout () {
            this.$store.dispatch(types.AUTH_LOGOUT);
            this.$router.replace({ path: "/login" });
        }
    }
}
</script>

<style lang="scss">
$header-height: 80px;
$aside-width: 200px;

body {
    overflow: hidden;
}
.private {
    position: relative;
    top: 0;
    bottom: 0;
    width: 100%;

    & > header {
        background-color: #7098ff;
        padding: 0 20px;
        height: $header-height;
        font-size: 23px;

        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-between;
    }

    & > main > aside {
        height: 100%;
        width: $aside-width;
    }

    & > main {
        min-height:  calc(100% - #{$header-height});

        & > section {
            flex: 1;
            height: 100%;
            margin-left: $aside-width;
        }

        & > aside {
            position: fixed;
            width: $aside-width;
            min-height: calc(100vh - #{$header-height});
            overflow: hidden;
            transition: all 0.3s ease;

            > .el-menu {
                height: 100%;
            }
        }

        & > section > div {
            width: 100%;
            height: calc(100vh - #{$header-height});
            position: relative;
            box-sizing: border-box;
            padding: 10px;
            padding-bottom: 20px;
        }
    }
}
</style>
