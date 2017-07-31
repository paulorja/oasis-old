ENV['RACK_ENV'] = 'production'
ENV['WS_URL'] = 'ws://52.67.91.129:5000'

require 'uglifier'
require "yui/compressor"
require "securerandom"
require "fileutils"

# delete assets
FileUtils.rm_rf(Dir.glob('./production'))
# create dirs
Dir.mkdir './production'
Dir.mkdir './production/js'
Dir.mkdir './production/css'
# compile assets
File.open("./production/css/#{SecureRandom.hex(14)}.css", "w+") do |compress_file|
  Dir.glob("./development/css/*.css") do |css_file|
    compress_file.write(YUI::CssCompressor.new.compress(File.read(css_file)))
  end
end
all_js = "./production/js/#{SecureRandom.hex(14)}.js"
File.open(all_js, "w+") do |compress_file|
  Dir.glob("./development/js/*.js") do |js_file|
    compress_file.write(Uglifier.compile(File.read(js_file)))
  end
end
all_js_data = File.read(all_js)
File.open(all_js, "w") do |file|
  file.write(Uglifier.compile(all_js_data))
end

FileUtils.copy_entry './development/sprites', './production/sprites'








require 'sinatra'
set :environment, ENV['RACK_ENV']
set :public_folder, File.dirname(__FILE__) + '/' + ENV['RACK_ENV']
get '/' do
  erb :index
end