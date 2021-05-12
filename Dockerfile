#############
# Build .NET
#############
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR /Source
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Shorty.Web.dll

# Copy csproj and restore as distinct layer
COPY Source/Shorty.Web/*.csproj .
RUN dotnet restore

# Copy web project & MS build as distinct layer
COPY /Source/Shorty.Web .
RUN dotnet publish -c Release -o out

#####################################################
# Copy all the rest & Client build as distinct layer
#####################################################
FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm i --quiet --force
COPY . .
CMD npm run build:prod

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /Source/Shorty.Web
COPY --from=build Source/out .
ENTRYPOINT ["dotnet", "Shorty.Web.dll"]
