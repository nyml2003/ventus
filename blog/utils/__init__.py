import re


def remove_markdown(content):
    content = re.sub(r"!\[.*?\]\(.*?\)", "", content)
    content = re.sub(r"\[.*?\]\(.*?\)", "", content)
    content = re.sub(r"```.*?```", "", content, flags=re.DOTALL)
    content = re.sub(r"\$\$.*?\$\$", "", content, flags=re.DOTALL)
    content = re.sub(r"`.*?`", "", content)
    content = re.sub(r"\|.*?\|.*?\|", "", content)
    content = re.sub(r"\n{2,}", "\n", content)
    content = content.replace("*", "").replace("-", "").replace("#", "").replace("~", "")
    content = re.sub(r"\n\d\..*", "", content)
    content = re.sub(r"(?m)^\s+|\s+$", "", content)
    content = re.sub(r"\n", " ", content)
    return content[:100]+"..."
