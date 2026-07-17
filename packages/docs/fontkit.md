---
layout: false
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const { go } = useRouter()

onMounted(() => {
	go('/pdf-lab/fontkit/introduction/what-is-fontkit.html')
})
</script>

Redirecting you to the Fontkit API documentation... If you are not redirected automatically, [click here](/fontkit/api/).
