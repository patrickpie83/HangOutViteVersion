<template>
    <nav class="navShadow fixed-bottom bg-white">
        <div class="container">
            <div class="row py-2">
                <div class="col-6">
                    <router-link :class="{'bg-hangout-decorate' : navState=='login'}" to="/login" type="button" class="LoginNavBtn">
                        登入會員
                    </router-link>
                </div>
                <div class="col-6">
                    <router-link :class="{'bg-hangout-decorate' : navState=='signup'}" to="/signup" type="button" class="LoginNavBtn">
                        註冊會員
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        navState(){
            return this.$route.name
        }
    }
}
</script>

<style lang="scss" scoped>

    .navShadow{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .LoginNavBtn{
        font-size: 12px;
        padding: 10px 0px;
        display: block;
        color: $hangout-primary;
        border-radius: 8px;
        text-decoration: none;
        text-align: center;
        &:hover{
            color: $hangout-primary;
            background-color: $hangout-decorate;
        }

        &:active{
            color:$hangout-text;
            background-color: $hangout-decorate;
        }

        @include pc{
            font-size: 16px;
            padding: 20px 0px;
        }
        
    }
    
</style>