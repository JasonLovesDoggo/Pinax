<script lang="ts">
	import {cn} from '$lib/utils.js';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import {CollapsibleContent, CollapsibleTrigger, Root} from "$lib/components/ui/collapsible";
	import {onMount} from 'svelte'; // @ts-ignore
	import {Button} from '$lib/components/ui/button/index.js';

	interface Language {
		name: string;
		color: string;
		size: number;
	}

	interface ModifiedLanguage extends Language {
		percentage: number;
	}

	interface Commit {
		repo: string;
		commitUrl: string;
		oid: string;
		messageHeadline: string;
		committedDate: string;
		additions: number;
		deletions: number;
		languages: Language[];
		parentCommits: ParentCommit[];
	}

	interface ParentCommit {
		additions: number;
		deletions: number;
		commitUrl: string;
		committedDate: string;
		messageHeadline: string;
	}

	let commitData: Commit | null = null;

	onMount(async () => {
		const response = await fetch('https://katib.jasoncameron.dev/commits/latest');
		commitData = await response.json();
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleString();
	}

	function calculateLanguagePercentages(languages: Language[]): ModifiedLanguage[] {
		const totalSize = languages.reduce((sum, lang) => sum + lang.size, 0);
		return languages.map((lang) => ({
			...lang,
			percentage: (lang.size / totalSize) * 100
		}));
	}
</script>

<div class={cn('flex min-h-screen items-center justify-center bg-[#0d1117] p-4 text-[#c9d1d9]')}>
	<div class={cn('w-full max-w-2xl rounded-lg bg-[#161b22] p-6 shadow-lg')}>
		{#if commitData}
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<a href="https://github.com/{commitData.repo}" target="_blank" rel="noopener noreferrer">
						<h2 class={cn('text-xl font-semibold text-[#58a6ff]')}>{commitData.repo}</h2>
					</a>
					<a
						href={commitData.commitUrl}
						target="_blank"
						class={cn('text-[#58a6ff] hover:underline')}
					>
						<span class={cn('rounded bg-[#0d1117] px-2 py-1 font-mono text-sm')}
							>{commitData.oid.substring(0, 7)}</span
						>
					</a>
				</div>

				<div>
					<p class="text-base font-medium">{commitData.messageHeadline}</p>
					<p class="mt-1 text-xs text-gray-500">{formatDate(commitData.committedDate)}</p>
				</div>

                <div class="flex space-x-4 text-sm">
                    <span class="text-green-500">+{commitData.additions}</span>
                    <span class="text-red-500">-{commitData.deletions}</span>
                </div>

				<div class="mt-2 flex h-1.5 overflow-hidden rounded-full">
					{#each calculateLanguagePercentages(commitData.languages) as lang}
						<div
							class="h-full"
							style={`width: ${lang.percentage}%; background-color: ${lang.color};`}
							title={`${lang.name} ${lang.percentage.toFixed(1)}%`}
						></div>
					{/each}
				</div>

				<div class="mt-4">
					<Root>
						<CollapsibleTrigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="ghost"
								size="sm"
								class="w-full justify-start p-2 text-left text-gray-400 hover:text-white"
							>
								<ChevronsUpDown class="mr-2 h-3 w-3" />
								View Parent Commits ({commitData.parentCommits.length})
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div class="mt-2 space-y-2">
								{#each commitData.parentCommits as parent}
									<div class={cn('rounded-md bg-[#0d1117] p-3')}>
										<div class="flex items-center justify-between">
											<a
												href={parent.commitUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="text-sm text-[#58a6ff] hover:underline"
											>
												{parent.messageHeadline}
											</a>
											<span class="text-xs text-gray-400">{formatDate(parent.committedDate)}</span>
										</div>
										<div class="mt-1 flex space-x-2 text-xs">
											<span class="text-green-500">+{parent.additions}</span>
											<span class="text-red-500">-{parent.deletions}</span>
										</div>
									</div>
								{/each}
							</div>
						</CollapsibleContent>
					</Root>
				</div>
			</div>
		{:else}
			<div class="flex animate-pulse flex-col space-y-4">
				<div class={cn('h-4 w-3/4 rounded bg-[#30363d]')}></div>
				<div class={cn('h-4 w-1/2 rounded bg-[#30363d]')}></div>
				<div class={cn('h-4 w-full rounded bg-[#30363d]')}>
					<div class="flex items-center justify-center">
						<span class="text-sm text-gray-500">Loading</span>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
