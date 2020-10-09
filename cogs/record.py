from discord.ext import commands


class Record(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.group(brief="Recording Commands", invoke_without_commmand=True)
    async def record(self, ctx):
        """Commands to record a conversation"""
        await ctx.send_help(ctx.command)

    async def ping(self, ctx):
        """Test command"""
        await ctx.send("Pong")


def setup(bot):
    bot.add_cog(Record(bot))
