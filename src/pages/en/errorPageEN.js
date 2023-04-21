export const errorPageEN = {
  render: function render() {
    return `
    <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="flex items-center justify-center bg-red-500 text-white rounded-full w-16 h-16 mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M14.156 4.156a.5.5 0 0 0-.625-.078L10 6.5 6.469 4.078a.5.5 0 0 0-.625.78L9.5 9.499l-3.656 3.657a.5.5 0 0 0 .625.781L10 12.5l3.531 2.422a.5.5 0 0 0 .625-.78L10.5 9.499l3.656-3.657z"
        />
      </svg>
    </div>
    <h1 class="text-4xl font-bold mb-8">The site couldn't be accessed.</h1>
    <p class="text-lg mb-8">Try again!</p>
    <a  href="/#/en"><button class="button">Main page</button></a>
  </div>`
  },
}