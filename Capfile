require 'capistrano_colors'

load 'deploy' if respond_to?(:namespace) # cap2 differentiator

set :application, "rakugakijs"

# role :web, "ata.ma"                          # Your HTTP server, Apache/etc
role :app, "hadashikick.jp"                          # This may be the same as your `Web` server
# role :db,  "ata.ma", :primary => true # This is where Rails migrations will run
# role :db,  "ata.ma"

set :deploy_to, "/var/apps/#{application}"

set :node_bin, "/usr/bin/node"
set :node_file, "app.js"
set :shared_children, %w(log pids sockets node_modules rakugaki)

set :scm, :git
set :repository,  "git@github.com:f-kubotar/rakugakijs.git"
set :branch, ENV['BRANCH'] || 'master'
set :deploy_via, :remote_cache

set :user, "app"
set :use_sudo, false
set :admin_runner, 'node_js'

namespace :deploy do
  task :start, :roles => :app, :except => { :no_release => true } do
    sudo "#{sudo} start #{application}"
  end

  task :stop, :roles => :app, :except => { :no_release => true } do
    run "#{sudo} stop #{application}"
  end

  task :restart, :roles => :app, :except => { :no_release => true } do 
    run "#{sudo} restart #{application} || #{sudo} start #{application}"
  end

  task :symlink_shared do 
    run "rm -f #{current_path}/tmp/sockets && ln -s #{shared_path}/sockets #{current_path}/tmp/sockets"
    run "rm -f #{current_path}/public/rakugaki && ln -s #{shared_path}/rakugaki #{current_path}/public/rakugaki"
  end

  task :write_upstart_script, :roles => :app do
    upstart_script = <<-UPSTART
description "#{application}"

start on startup
stop on shutdown

script
# We found $HOME is needed. Without it, we ran into problems
export HOME="/home/#{admin_runner}"

cd #{current_path}
exec sudo -u #{admin_runner} sh -c "NODE_ENV=production NODE_PATH="#{current_path}/node_modules:$NODE_PATH" #{node_bin} #{current_path}/#{node_file} >> #{shared_path}/log/upstart.log 2>&1"
end script
respawn
UPSTART
  put upstart_script, "/tmp/#{application}_upstart.conf"
    run "#{sudo} mv /tmp/#{application}_upstart.conf /etc/init/#{application}.conf"
  end
end

namespace :npm do 
  task :install, :roles => :app, :except => { :no_release => true } do 
    # run "cd #{current_path} && #{sudo :as => admin_runner} npm install -d"
    run "cd #{current_path} && npm install -d"
  end

  task :create_symlink do
    run "rm -f #{current_path}/node_modules && ln -s #{shared_path}/node_modules #{current_path}/node_modules"
  end
end

after 'deploy:setup', 'deploy:write_upstart_script'

# after 'deploy:create_symlink', 'deploy:symlink_shared'

after 'deploy:create_symlink', 'npm:create_symlink'
after 'deploy:update', 'npm:install'

after 'deploy:update', 'deploy:cleanup'
