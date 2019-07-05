# NetCoreVersionExtractor
A custom build task for Azure Devops that extracts the Version property from .NET Core and .NET Standard project files.

## Cross platform and ready for .NET Core

In contrast to other build tasks in the market place, this task will run on both Windows and Linux agents, and is written to extract the <Version> element from .NET Core csproj files. If you need to extract this information from Assembly info files/properties, take a look at some of the other great custom tasks out there.

## Re-usable within your pipeline

You can provide an optional prefix which will be prepended before the variable set by the task. This allows you to reuse this task within your pipeline without losing any information from previous runs.

The prefix should be alphanumeric and up to 25 characters.

## Reading the data

If no prefix is provided, the task will save your <Version> to `$(ProjectVersion)`. If a prefix is provided it will be saved to `$(Prefix-ProjectVersion)`.