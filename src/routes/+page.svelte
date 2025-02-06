<script lang="ts">
	import { page } from "$app/state";
    import { signIn, signOut } from "@auth/sveltekit/client"
 </script>

{JSON.stringify(page.data.session?.user?.email)}
  
 <div>
   <button onclick={_ => signIn("discord")} class="btn">Login</button>
   <button onclick={_ => signOut()} class="btn">SignOut</button>
 </div> 