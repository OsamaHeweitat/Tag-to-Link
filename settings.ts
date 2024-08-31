import TagToLinkPlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class TagToLinkSettingsTab extends PluginSettingTab {
  plugin: TagToLinkPlugin;

  constructor(app: App, plugin: TagToLinkPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Word for \"Tags\"")
      .setDesc("When generating links from tags, what word should right before the links? (e.g. \"Tags\" in \"Tags: tag1, tag2\")")
      .addText((text) =>
        text
          .setPlaceholder("Tags")
          .setValue(this.plugin.settings.wordForTags)
          .onChange(async (value) => {
            this.plugin.settings.wordForTags = value;
            await this.plugin.saveSettings();
          })
      );
  }
}