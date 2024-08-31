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
      .setName("Name for in-text link-tags")
      .setDesc("When generating links from tags in-text, what name should be used right before the links? (e.g. \"Tags\" in \"Tags: tag1, tag2\")")
      .addText((text) =>
        text
          .setPlaceholder("Tags")
          .setValue(this.plugin.settings.wordForTextTags)
          .onChange(async (value) => {
            this.plugin.settings.wordForTextTags = value;
            await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("Name for property link-tags")
      .setDesc("When generating links from tags in properties, what should the property name be? (e.g. \"linktags\" in \"linktags: tag1, tag2\")")
      .addText((text) =>
        text
          .setPlaceholder("linktags")
          .setValue(this.plugin.settings.wordForPropertyTags)
          .onChange(async (value) => {
            this.plugin.settings.wordForPropertyTags = value;
            await this.plugin.saveSettings();
        })
      );
  }
}