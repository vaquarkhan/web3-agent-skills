package com.vaquarkhan.web3agentskills

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.ui.Messages
import com.intellij.openapi.project.Project
import java.io.File
import java.net.URI
import java.nio.file.Files

abstract class BaseInstallAction(private val label: String, private val files: List<String>) : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val baseDir = project.basePath ?: return
        var installed = 0
        for (relative in files) {
            try {
                installFile(baseDir, relative)
                installed++
            } catch (ex: Exception) {
                Messages.showErrorDialog(project, "Failed $relative: ${ex.message}", "Web3 Agent Skills")
                return
            }
        }
        Messages.showInfoMessage(project, "Installed $installed file(s) for $label.", "Web3 Agent Skills")
    }

    private fun installFile(baseDir: String, relative: String) {
        val target = File(baseDir, relative)
        target.parentFile?.mkdirs()
        val url = "${InstallerData.RAW_BASE_URL}/$relative"
        val bytes = URI(url).toURL().openStream().readBytes()
        Files.write(target.toPath(), bytes)
    }
}

class InstallCoreAction : BaseInstallAction("core pack", InstallerData.coreFiles)

class InstallFullAction : BaseInstallAction("full toolkit", InstallerData.coreFiles + listOf(
    "presets/ethereum-mainnet.yaml",
    "starter-packs/defi-trader-starter.yaml",
    "mcp/blockchain-rpc.mcp.json",
    "examples/README.md"
))
