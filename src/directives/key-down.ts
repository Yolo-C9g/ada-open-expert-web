const vEnterKeyDown = {
    mounted(el: Element, binding: any) {
        if (el) {
            document.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') {
                    if (typeof binding.value.data === 'function') {
                        binding.value.data()
                    }
                }
            })
        }
    },
}

export default vEnterKeyDown

