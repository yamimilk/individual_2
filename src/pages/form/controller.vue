<template>
   <div class="controller">
        <UserData>
            <!-- <template v-slot="params">
                <ul>
                    <li v-for="d in params.users" :key="d.id">
                        {{ d.name }}
                    </li>
                </ul>
            </template> -->
        </UserData>
   </div>
</template>

<script lang="ts">
export default {
    name:"con"
}
</script>

<script lang="ts" setup>
    import UserData from './userData.vue';
</script>



