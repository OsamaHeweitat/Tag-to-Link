import { TagToLinkSettingsTab } from 'settings';
import { MarkdownView, Editor, Plugin } from 'obsidian';

interface TagToLinkSettings {
	wordForTags: string;
}

const DEFAULT_SETTINGS: TagToLinkSettings = {
	wordForTags: 'Tags'
};

export default class TagToLinkPlugin extends Plugin {
	settings: TagToLinkSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new TagToLinkSettingsTab(this.app, this));

		this.addCommand({
			id: 'tag-to-link',
			name: 'Convert tags to links',
			checkCallback: (checking: boolean) => {
				const noteFile = this.app.workspace.getActiveFile();
				if(noteFile){
					let noteName = noteFile.name;
					let regexp = new RegExp(/\.(md)$/g);
					if(regexp.test(noteName)){
						if(!checking){
							let text = this.app.vault.read(noteFile);
							text.then((text) => {
								const regex = /tags:\s*\n((?:\s*-\s*.*\n?)*)/g;
								const match = regex.exec(text);
								const tags = match ? match[1].split('\n')
									.map(tag => tag.trim())
									.filter(tag => tag.startsWith('-'))
									.map(tag => tag.replace(/^-/, '').trim()) : [];
								const updatedText = text.replace(/---([\s\S]*?)---/, (match, yamlContent) => {
									const tagsLine = this.settings.wordForTags + `: ${tags.map(tag => `[[${tag}]]`).join(', ')}`;
									return `---${yamlContent}---\n${tagsLine}`;
								});
								this.app.vault.modify(noteFile, updatedText);
							});
						}
						return true;
					}
					return false;
				}
				return false;
			}
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	  }
}